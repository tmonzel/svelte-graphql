import { client } from '$lib/graphql';
import type { DocumentNode, Observable } from '@apollo/client/core';

export interface Entity {
  id: string;
}

export type EntityQueryMap = {
  list: DocumentNode;
  create: DocumentNode;
  update: DocumentNode;
  destroy: DocumentNode;
}

export function createEntity<T extends Entity, EntiyInputType>(name: string, queries: EntityQueryMap) {
  function writeListQuery(writer: (list: T[]) => T[]) {
    const listQuery = client.readQuery({ query: queries.list });
    
    if(listQuery) {
      client.writeQuery({ 
        query: queries.list, 
        data: { 
          ...listQuery, 
          collections: {
            ...listQuery[name],
            list: writer(listQuery[name].list)
          }
        } 
      })
    }
  }

  async function create(input: EntiyInputType) {
    const result = await client.mutate({ 
			mutation: queries.create, 
			variables: { input }
		});

		writeListQuery((oldList) => {
			return [...oldList, result.data[name].create]
		})
  }

  function watchAll(): Observable<T[]> {
    return client.watchQuery({ 
			query: queries.list 
		}).map(result => result.data[name].list) as Observable<T[]>;
  }

  async function destroy(id: string) {
		await client.mutate({ 
			mutation: queries.destroy, 
			variables: { name }
		});

		writeListQuery((list) => {
			return list.filter(entity => entity.id !== id)
		})
	}

  return {
    watchAll,
    create,
    destroy
  }
}
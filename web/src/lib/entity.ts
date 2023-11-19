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

export function createEntity<T extends Entity, EntityInputType>(name: string, queries: EntityQueryMap) {
  function writeListQuery(writer: (list: T[]) => T[]) {
    const listQuery = client.readQuery({ query: queries.list });
    
    if(listQuery) {
      client.writeQuery({ 
        query: queries.list, 
        data: { 
          ...listQuery, 
          [name]: {
            ...listQuery[name],
            list: writer(listQuery[name].list)
          }
        } 
      })
    }
  }

  async function create(input: EntityInputType) {
    const result = await client.mutate({ 
			mutation: queries.create, 
			variables: { input }
		});

		writeListQuery((oldList) => {
			return [...oldList, result.data[name].create]
		})
  }

  async function update(id: string, changes: Partial<EntityInputType>) {
    const result = await client.mutate({ 
			mutation: queries.update, 
			variables: { id, changes }
		});

		writeListQuery((oldList) => {
      for(const index in oldList) {
        const entity = oldList[index] as T;

        if(entity.id === id) {
          oldList[index] = { ...oldList[index], ...result.data[name].update };
          break;
        }
      }
      
      return oldList;
		})
  }

  function watchAll(): Observable<T[]> {
    return client.watchQuery({ 
			query: queries.list 
		}).map(result => result.data[name].list) as Observable<T[]>;
  }

  async function findById(id: string): Promise<T | undefined> {
    const result = await client.query({ query: queries.list });

    return (result.data[name].list as T[]).find(entity => entity.id === id);
  }

  async function destroy(id: string) {
		await client.mutate({ 
			mutation: queries.destroy, 
			variables: { id }
		});

		writeListQuery((list) => {
			return list.filter(entity => entity.id !== id)
		})
	}

  return {
    watchAll,
    findById,
    create,
    destroy,
    update
  }
}
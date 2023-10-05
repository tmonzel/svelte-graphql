import { client } from '$lib/graphql';
import type { ApolloClient, NormalizedCacheObject, Observable } from "@apollo/client/core";
import type { Collection, CreateCollectionInput, ListAllQuery } from './types';
import { CREATE_COLLECTION, DROP_COLLECTION, FIND_COLLECTIONS } from './queries';

export class CollectionModel {
  readonly all$: Observable<Collection[]>;
  
  constructor(readonly graphql: ApolloClient<NormalizedCacheObject>) {
    this.all$ = graphql.watchQuery<ListAllQuery>({ 
			query: FIND_COLLECTIONS 
		}).map(result => result.data.collections.list);
  }

  async create(input: CreateCollectionInput) {
    const result = await this.graphql.mutate({ 
			mutation: CREATE_COLLECTION, 
			variables: { input }
		});

		this.writeListQuery((oldList) => {
			return [...oldList, result.data.collections.create]
		})
  }

	async drop(name: string) {
		await this.graphql.mutate({ 
			mutation: DROP_COLLECTION, 
			variables: { name }
		});

		this.writeListQuery((oldList) => {
			return oldList.filter(col => col.name !== name)
		})
	}

	private writeListQuery(writer: (list: Collection[]) => Collection[]) {
		const findQuery = this.graphql.readQuery<ListAllQuery>({ query: FIND_COLLECTIONS });
		
		if(findQuery) {
			this.graphql.writeQuery({ 
				query: FIND_COLLECTIONS, 
				data: { 
					...findQuery, 
					collections: {
						...findQuery.collections,
						list: writer(findQuery.collections.list)
					}
				} 
			})
		}
	}
}

export const collectionModel = new CollectionModel(client);
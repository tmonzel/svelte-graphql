import { client } from '$lib/graphql';
import type { ApolloClient, NormalizedCacheObject, ObservableQuery } from "@apollo/client/core";
import type { CreateCollectionInput, ListAllQuery } from './types';
import { CREATE_COLLECTION, FIND_COLLECTIONS } from './queries';

export class CollectionModel {
  readonly all$: ObservableQuery<ListAllQuery>;
  
  constructor(readonly graphql: ApolloClient<NormalizedCacheObject>) {
    this.all$ = graphql.watchQuery<ListAllQuery>({ query: FIND_COLLECTIONS });
  }

  async create(input: CreateCollectionInput) {
    const result = await this.graphql.mutate({ 
			mutation: CREATE_COLLECTION, 
			variables: { input }
		});

		const findQuery = this.graphql.readQuery<ListAllQuery>({ query: FIND_COLLECTIONS });
		
		if(findQuery) {
			this.graphql.writeQuery({ 
				query: FIND_COLLECTIONS, 
				data: { 
					...findQuery, 
					collections: {
						...findQuery.collections,
						list: [...findQuery.collections.list, result.data.collections.create]
					}
				} 
			})
		}
  }
}

export const collectionModel = new CollectionModel(client);
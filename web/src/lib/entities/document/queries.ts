import type { EntityQueryMap } from '$lib/entity';
import { gql } from '@apollo/client/core';

export const queryMap = {
  list: gql`
    query ListDocuments($collectionName: String!) {
      documents {
        list(collectionName: $collectionName)
      }
    }
  `,

  create: gql`
    mutation CreateSchema($collectionName: String!, $input: DocumentInput!) {
      documents {
        create(collectionName: $collectionName, input: $input)
      }
    }
  `,

  update: gql`
    mutation UpdateSchema($collectionName: String!, $id: ID!, $changes: DocumentInput!) {
      documents {
        update(collectionName: $collectionName, id: $id, changes: $changes)
      }
    }
  `,

  destroy: gql`
    mutation DeleteSchema($collectionName: String!, $id: ID!) {
      documents {
        delete(collectionName: $collectionName, id: $id)
      }
    }
  `
} satisfies EntityQueryMap;

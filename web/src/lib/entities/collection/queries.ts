import { gql } from '@apollo/client/core';

export const FIND_COLLECTIONS = gql`
  query FindCollections {
    collections {
      list {
        name
      }
    }
  }
`;

export const CREATE_COLLECTION = gql`
  mutation CreateCollection($input: CreateCollectionInput!) {
    collections {
      create(input: $input) {
        name
      }
    }
  }
`;
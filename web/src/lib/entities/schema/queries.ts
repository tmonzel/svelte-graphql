import type { EntityQueryMap } from '$lib/entity';
import { gql } from '@apollo/client/core';

export const queryMap = {
  list: gql`
    query ListSchemata {
      schemata {
        list {
          id
          name
        }
      }
    }
  `,

  create: gql`
    mutation CreateSchema($input: CreateSchemaInput!) {
      schemata {
        create(input: $input) {
          name
        }
      }
    }
  `,

  update: gql`
    mutation UpdateSchema($input: UpdateSchemaInput!) {
      schemata {
        update(input: $input) {
          name
        }
      }
    }
  `,

  destroy: gql`
    mutation DeleteSchema($name: String!) {
      schemata {
        delete(name: $name)
      }
    }
  `
} satisfies EntityQueryMap;

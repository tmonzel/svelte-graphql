import type { EntityQueryMap } from '$lib/entity';
import { gql } from '@apollo/client/core';

export const SCHEMA_FIELDS = gql`
  fragment SchemaFields on Schema {
    id
    name
    attributes {
      type
      name
      required
    }
  }
`;

export const queryMap = {
  list: gql`
    ${SCHEMA_FIELDS}
    query ListSchemata {
      schemata {
        list {
          ...SchemaFields
        }
      }
    }
  `,

  create: gql`
    ${SCHEMA_FIELDS}
    mutation CreateSchema($input: CreateSchemaInput!) {
      schemata {
        create(input: $input) {
          ...SchemaFields
        }
      }
    }
  `,

  update: gql`
    ${SCHEMA_FIELDS}
    mutation UpdateSchema($id: ID!, $changes: UpdateSchemaInput!) {
      schemata {
        update(id: $id, changes: $changes) {
          ...SchemaFields
        }
      }
    }
  `,

  destroy: gql`
    mutation DeleteSchema($id: ID!) {
      schemata {
        delete(id: $id)
      }
    }
  `
} satisfies EntityQueryMap;

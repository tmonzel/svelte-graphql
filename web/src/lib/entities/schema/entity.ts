import { queryMap } from './queries';
import { createEntity, type Entity } from '$lib/entity';

export interface Schema extends Entity {
  name: string;
}

export type CreateSchemaInput = {
  name: string;
}

export const SchemaEntity = createEntity<Schema, CreateSchemaInput>(
	'schemata', 
	queryMap
);

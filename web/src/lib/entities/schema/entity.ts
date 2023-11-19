import { queryMap } from './queries';
import { createEntity, type Entity } from '$lib/entity';

export interface Schema extends Entity {
  name: string;
}

export type SchemaInput = {
  name: string;
}

export const SchemaEntity = createEntity<Schema, SchemaInput>(
	'schemata', 
	queryMap
);

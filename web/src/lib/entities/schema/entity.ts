import { queryMap } from './queries';
import { createEntity, type Entity } from '$lib/entity';

export interface Schema extends Entity {
  name: string;
  attributes: SchemaAttribute[];
}

export interface SchemaAttribute {
  type: string;
  name: string;
  required: boolean;
}

export type SchemaInput = {
  id?: string;
  name: string;
  attributes: SchemaAttribute[];
}

export const SchemaEntity = createEntity<Schema, SchemaInput>(
	'schemata', 
	queryMap
);

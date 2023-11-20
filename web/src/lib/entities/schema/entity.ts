import { queryMap } from './queries';
import { createEntity, type Entity } from '$lib/entity';

export interface Schema extends Entity {
  name: string;
  collectionName: string;
  description: string;
  attributes: Attribute[];
}

export interface Attribute {
  type: string;
  name: string;
  label: string;
  required: boolean;
}

export type SchemaInput = {
  id?: string;
  name: string;
  collectionName: string;
  description: string;
  attributes: Attribute[];
}

export const SchemaEntity = createEntity<Schema, SchemaInput>(
	'schemata', 
	queryMap
);

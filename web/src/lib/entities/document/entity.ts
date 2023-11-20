import { queryMap } from './queries';
import { createEntity, type Entity, type EntityModel } from '$lib/entity';

export interface Document extends Entity {
  [prop: string]: any;
}

export type DocumentInput = {
  id?: string;
  [prop: string]: any;
}

const documentEntityDict: { [name: string]: EntityModel<Document, DocumentInput> } = {};

export const getDocumentEntity = (collectionName: string) => {
  if(documentEntityDict[collectionName]) {
    return documentEntityDict[collectionName]!;
  }

  return documentEntityDict[collectionName] = createEntity<Document, DocumentInput>(
    'documents', 
    queryMap,
    { collectionName }
  );
}

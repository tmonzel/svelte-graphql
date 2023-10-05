export type Collection = {
  name: string;
}

export type CreateCollectionInput = {
  name: string;
}

export type ListAllQuery = {
  collections: { list: Collection[] }
}

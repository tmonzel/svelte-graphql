from ariadne import ObjectType
from schema import query, mutation
from db import db

collection = ObjectType('Collection')
collection_queries = ObjectType('CollectionQueries')
collection_mutations = ObjectType('CollectionMutations')

@query.field('collections')
def resolve_collection_queries(obj, info):
  return collection_queries

@mutation.field('collections')
def resolve_collection_mutations(obj, info):
  return collection_mutations

@collection_queries.field('list')
def resolve_collection_list(obj, info):
    return db.list_collections()

@collection_mutations.field('create')
def resolve_create_collection(obj, info, input):
    db.create_collection(input["name"])
    return { "name": input["name"] }

@collection_mutations.field('drop')
def resolve_delete_collection(obj, info, name):
    db.drop_collection(name)
    return True
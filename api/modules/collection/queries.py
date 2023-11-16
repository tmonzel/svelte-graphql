from ariadne import ObjectType
from schema import query
from db import db

collection_queries = ObjectType('CollectionQueries')

@query.field('collections')
def resolve_collection_queries(obj, info):
  return collection_queries

@collection_queries.field('list')
def resolve_collection_list(obj, info):
    return db.list_collections()
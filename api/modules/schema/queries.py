from ariadne import ObjectType
from schema import query
from db import db

schema_queries = ObjectType('SchemaQueries')

def mapEntity(entity):
    # Add virtual id without the underscore
    entity['id'] = entity['_id'];
    return entity;

@query.field('schemata')
def resolve_schema_queries(obj, info):
  return schema_queries

@schema_queries.field('list')
def resolve_schema_list(obj, info):
  result = db.schemata.find()
  return map(mapEntity, result)
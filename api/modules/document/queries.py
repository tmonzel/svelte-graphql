from ariadne import ObjectType
from schema import query
from db import db

document_queries = ObjectType('DocumentQueries')

@query.field('documents')
def resolve_document_queries(obj, info):
  return document_queries

@document_queries.field('list')
def resolve_document_list(obj, info, collectionName):
  result = db[collectionName].find()
  return result
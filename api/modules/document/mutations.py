from ariadne import ObjectType
from schema import mutation
from db import db
from bson.objectid import ObjectId

document_mutations = ObjectType('DocumentMutations')

@mutation.field('documents')
def resolve_documents_mutations(obj, info):
  return document_mutations

@document_mutations.field('create')
def resolve_create_document(obj, info, collectionName, input):
  result = db[collectionName].insert_one(input)
  doc = db[collectionName].find_one({ '_id': ObjectId(result.inserted_id) })
  
  return doc

@document_mutations.field('update')
def resolve_update_document(obj, info, collectionName, id, changes):
  db[collectionName].update_one({ '_id': ObjectId(id) }, { "$set": changes })
  doc = db[collectionName].find_one({ '_id': ObjectId(id) })

  return doc

@document_mutations.field('delete')
def resolve_delete_document(obj, info, collectionName, id):
  db[collectionName].delete_one({ '_id': ObjectId(id) })
  return True
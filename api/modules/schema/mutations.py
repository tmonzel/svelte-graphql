from ariadne import ObjectType
from schema import mutation
from db import db
from bson.objectid import ObjectId

schema_mutations = ObjectType('SchemaMutations')

@mutation.field('schemata')
def resolve_schemata_mutations(obj, info):
  return schema_mutations

@schema_mutations.field('create')
def resolve_create_schema(obj, info, input):
  result = db.schemata.insert_one(input)
  schema = db.schemata.find_one({ '_id': ObjectId(result.inserted_id) })

  if(schema):
    schema['id'] = schema['_id']
  
  return schema

@schema_mutations.field('update')
def resolve_update_schema(obj, info, id, changes):
  db.schemata.update_one({ '_id': ObjectId(id) }, { "$set": changes })
  schema = db.schemata.find_one({ '_id': ObjectId(id) })
  
  if(schema):
    schema['id'] = schema['_id']

  return schema

@schema_mutations.field('delete')
def resolve_delete_schema(obj, info, id):
  db.schemata.delete_one({ '_id': ObjectId(id) })
  return True
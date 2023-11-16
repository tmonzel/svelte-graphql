from ariadne import ObjectType
from schema import mutation
from db import db

schema_mutations = ObjectType('SchemaMutations')

@mutation.field('schemata')
def resolve_schemata_mutations(obj, info):
  return schema_mutations

@schema_mutations.field('create')
def resolve_create_schema(obj, info, input):
  db.schemata.insert_one(input)
  return { "name": input["name"] }
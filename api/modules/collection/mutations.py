from ariadne import ObjectType
from schema import mutation
from db import db

collection_mutations = ObjectType('CollectionMutations')

@mutation.field('collections')
def resolve_collection_mutations(obj, info):
  return collection_mutations

@collection_mutations.field('create')
def resolve_create_collection(obj, info, input):
    db.create_collection(input["name"])
    return { "name": input["name"] }

@collection_mutations.field('drop')
def resolve_delete_collection(obj, info, name):
    db.drop_collection(name)
    return True
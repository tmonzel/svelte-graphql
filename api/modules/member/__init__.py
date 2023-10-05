from ariadne import load_schema_from_path, ObjectType
from schema import query
from pathlib import Path
from .queries import queries_type
from .mutations import mutations_type

member_type = ObjectType('Member')

@query.field('members')
def resolve_members(obj, info):
  return queries_type

member_type_defs = load_schema_from_path(str(Path(__file__).parent) + '/types.graphql')
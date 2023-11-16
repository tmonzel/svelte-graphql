from ariadne import load_schema_from_path, ObjectType
from pathlib import Path
from .mutations import schema_mutations
from .queries import schema_queries

schema_type = ObjectType('Schema')
schema_type_defs = load_schema_from_path(str(Path(__file__).parent) + '/types.graphql')
from ariadne import load_schema_from_path, ObjectType
from pathlib import Path
from .mutations import collection_mutations
from .queries import collection_queries

collection_type = ObjectType('Collection')
collection_type_defs = load_schema_from_path(str(Path(__file__).parent) + '/types.graphql')
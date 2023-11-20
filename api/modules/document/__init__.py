from ariadne import load_schema_from_path, ObjectType, ScalarType
from pathlib import Path
from .mutations import document_mutations
from .queries import document_queries

document_type = ScalarType('Document')
document_list_type = ScalarType('DocumentList')
document_type_defs = load_schema_from_path(str(Path(__file__).parent) + '/types.graphql')

def mapDocument(doc):
    # Add virtual id without the underscore
    doc['id'] = str(doc['_id']);
    del doc['_id']
    return doc;

@document_list_type.serializer
def serialize_document_list_type(value):
  return list(map(mapDocument, value))

@document_type.serializer
def serialize_document_type(doc):
  return mapDocument(doc)


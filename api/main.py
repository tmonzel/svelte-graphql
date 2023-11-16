from flask import request, jsonify, Flask
from flask_cors import CORS
from ariadne import load_schema_from_path, graphql_sync, make_executable_schema
from schema import query, mutation

from modules.collection import (
    collection_type, 
    collection_type_defs, 
    collection_queries,
    collection_mutations
)

from modules.schema import (
    schema_type,
    schema_type_defs,
    schema_queries,
    schema_mutations
)

app = Flask(__name__)
CORS(app)

type_defs = load_schema_from_path("schema.graphql")
schema = make_executable_schema(
    [type_defs, collection_type_defs, schema_type_defs], 
    query, 
    mutation,

    collection_type, 
    collection_queries,
    collection_mutations,

    schema_type,
    schema_queries,
    schema_mutations
)

@app.route("/graphql", methods=["POST"])
def graphql_endpoint():
    data = request.get_json()
    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug=app.debug
    )

    status_code = 200 if success else 400

    return jsonify(result), status_code 

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9091, debug=True)
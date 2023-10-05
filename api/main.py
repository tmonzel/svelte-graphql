from flask import request, jsonify, Flask
from flask_cors import CORS
from ariadne import load_schema_from_path, graphql_sync, make_executable_schema
from schema import query, mutation

from modules.member import (
    member_type_defs, 
    member_type, 
    queries_type as member_queries,
    mutations_type as member_mutations
)

from resolvers.collection import collection, collection_queries, collection_mutations

app = Flask(__name__)
CORS(app)

type_defs = load_schema_from_path("schema.graphql")
schema = make_executable_schema(
    [type_defs, member_type_defs], 
    query, 
    mutation,
    
    collection,
    collection_queries,
    collection_mutations,

    member_type, 
    member_queries,
    member_mutations
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
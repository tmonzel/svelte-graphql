from schema import query, mutation
from ariadne import ObjectType
from models import Company

company = ObjectType('Company')
company_queries = ObjectType('CompanyQueries')

@query.field('companies')
def resolve_companies(obj, info):
  return company_queries

@company_queries.field('list')
def resolve_company_list(obj, info):
    return Company.find()

#@query.field('pickCompany')
#def resolve_company(obj, info, id):
#    return Company.find_one_by_id(id)

#@mutation.field('createCompany')
#def resolve_create_company(obj, info, input) -> bool:
#    Company.create(input)
 #   return True
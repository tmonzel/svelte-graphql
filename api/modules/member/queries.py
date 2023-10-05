from ariadne import ObjectType
from models import Member

queries_type = ObjectType('MemberQueries')

@queries_type.field('list')
def resolve_list(obj, info):
    return Member.find()

@queries_type.field('list')
def resolve_pick(obj, info, id):
    return Member.find_one_by_id(id)
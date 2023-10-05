from schema import query, mutation
from ariadne import ObjectType
from models import Member, Company

member = ObjectType('Member')

@query.field('listMembers')
def resolve_members_list(obj, info):
    return Member.find()

@query.field('pickMember')
def resolve_member(obj, info, id):
    return Member.find_one_by_id(id)

@mutation.field('createMember')
def resolve_create_member(obj, info, input) -> bool:
    Member.create(input)
    return True


@member.field('company')
def resolve_member_company(obj, info):
    return Company.find_one_by_id(obj['company_id'])
from ariadne import ObjectType
from models import Member

mutations_type = ObjectType('MemberMutations')

@mutations_type.field('create')
def resolve_create_member(obj, info, input) -> bool:
    Member.create(input)
    return True
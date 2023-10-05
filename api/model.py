from db import db
from typing import Optional
from bson.objectid import ObjectId

class Model:
  collection_name = ''

  @classmethod
  @property
  def collection(cls):
    return db[cls.collection_name]

  @classmethod
  def find(cls) -> list['Model']:
    return list(cls.collection.find())
  
  @classmethod
  def find_one(cls, filter):
    return cls.collection.find_one(filter)
  
  @classmethod
  def find_one_by_id(cls, id) -> Optional['Model']:
    obj = cls.collection.find_one({ "_id": ObjectId(id) })
    return cls.__mapObject(obj) if obj else None
  
  @classmethod
  def create(cls, data):
    return cls.collection.insert_one(data)
  
  @classmethod
  def __mapObject(cls, obj) -> 'Model':
    return obj
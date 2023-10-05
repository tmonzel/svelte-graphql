from pymongo import MongoClient

client = MongoClient("mongodb://root:test@db:27017")
db = client.get_database('heaven_db')

from pymongo import MongoClient
from dotenv import load_dotenv
import certifi
import os

load_dotenv()


MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")


client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())

db = client[DB_NAME]

user_collection = db["users"]
task_collection = db["tasks"]


print("MongoDB Connected")

from jose import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET")

AlGORITHM = "HS256"


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(days=1)

    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=AlGORITHM)

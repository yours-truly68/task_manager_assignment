from fastapi import FastAPI
from app.database.mongodb import db

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Backend is running"}

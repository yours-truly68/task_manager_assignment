from fastapi import FastAPI
from app.database.mongodb import db
from app.routes import auth

app = FastAPI()


app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "Backend is running"}

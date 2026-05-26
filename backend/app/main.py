from fastapi import FastAPI
from app.database.mongodb import db
from app.routes import auth
from app.routes.task_routes import router as task_router

app = FastAPI()


app.include_router(auth.router)
app.include_router(task_router)


@app.get("/")
def root():
    return {"message": "Backend is running"}

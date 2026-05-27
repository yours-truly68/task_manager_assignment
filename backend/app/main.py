from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.mongodb import db
from app.routes import auth
from app.routes.task_routes import router as task_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://task-manager-assignment-3vq3-83ub51s0b.vercel.app",
        "http://localhost:5173",
        "https://task-manager-assignment-5fml.vercel.app/",
    ],
    allow_credentials=True,
    allow_headers=["*"],
    allow_methods=["*"],
)


app.include_router(auth.router)
app.include_router(task_router)


@app.get("/")
def root():
    return {"message": "Backend is running"}

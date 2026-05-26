from fastapi import HTTPException, APIRouter, Depends, status
from datetime import datetime

from app.schemas.task_schema import TaskCreate
from app.utils.dependencies import get_current_user
from app.database.mongodb import task_collection
from bson import ObjectId

router = APIRouter()


@router.post("/tasks")
def create_task(task: TaskCreate, current_user: dict = Depends(get_current_user)):
    task_data = {
        "title": task.title,
        "description": task.description,
        "status": task.status,
        "priority": task.priority,
        "created_at": datetime.utcnow(),
        "user_id": str(current_user["_id"]),
    }

    result = task_collection.insert_one(task_data)

    return {"message": "Task Created Successfully", "task_id": str(result.inserted_id)}


@router.get("/tasks")
def get_tasks(current_user: dict = Depends(get_current_user)):

    tasks = list(task_collection.find({"user_id": str(current_user["_id"])}))

    serialized_tasks = []

    for task in tasks:
        serialized_task = {
            "_id": str(task["_id"]),
            "title": task["title"],
            "description": task["description"],
            "status": task["status"],
            "priority": task["priority"],
            "created_at": task["created_at"],
            "user_id": task["user_id"],
        }

        serialized_tasks.append(serialized_task)

    return {"tasks": serialized_tasks}


@router.get("/tasks/{task_id}")
def get_single_task(task_id: str, current_user: dict = Depends(get_current_user)):

    # Resource Level Authorisation
    task = task_collection.find_one(
        {"_id": ObjectId(task_id), "user_id": str(current_user["_id"])}
    )

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task Not Found."
        )

    serialized_task = {
        "_id": str(task["_id"]),
        "title": task["title"],
        "description": task["description"],
        "status": task["status"],
        "priority": task["priority"],
        "created_at": task["created_at"],
        "user_id": task["user_id"],
    }

    return {"task": serialized_task}

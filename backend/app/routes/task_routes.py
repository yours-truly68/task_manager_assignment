from fastapi import HTTPException, APIRouter, Depends, status
from datetime import datetime

from app.schemas.task_schema import TaskCreate
from app.utils.dependencies import get_current_user
from app.database.mongodb import task_collection
from app.schemas.task_schema import TaskUpdate
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

    if not tasks:
        return {"tasks": tasks, "count": len(tasks), "message": "No tasks found"}

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

    return {
        "tasks": serialized_tasks,
        "count": len(serialized_tasks),
    }


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


@router.put("/tasks/{task_id}")
def update_task(
    task_id: str,
    updated_task: TaskUpdate,
    current_user: dict = Depends(get_current_user),
):

    # Ownership validation
    existing_task = task_collection.find_one(
        {"_id": ObjectId(task_id), "user_id": str(current_user["_id"])}
    )

    if not existing_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task Not Found"
        )

    # exclude_unset=True --> Makes sure the DB isnt corrupted with Null values so only the data sent by user is updated and the rest are left untouched
    update_data = updated_task.dict(exclude_unset=True)

    task_collection.update_one({"_id": ObjectId(task_id)}, {"$set": update_data})
    # update_one() only returns updated metadata not document so we query again

    updated_task_db = task_collection.find_one({"_id": ObjectId(task_id)})

    if not updated_task_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Updated Task DB Not Found"
        )

    serialized_task = {
        "_id": str(
            updated_task_db["_id"],
        ),
        "title": updated_task_db["title"],
        "description": updated_task_db["description"],
        "status": updated_task_db["status"],
        "priority": updated_task_db["priority"],
        "created_at": updated_task_db["created_at"],
        "user_id": updated_task_db["user_id"],
    }

    return {"message": "Task Updated Successfully", "task": serialized_task}


@router.delete("/tasks/{task_id}")
def delete_task(task_id: str, current_user: dict = Depends(get_current_user)):
    # First verify ownership
    existing_task = task_collection.find_one(
        {"_id": ObjectId(task_id), "user_id": str(current_user["_id"])}
    )

    if not existing_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task Not Found"
        )

    # Deleting Task
    task_collection.delete_one({"_id": ObjectId(task_id)})

    return {"message": "Task Deleted Successfully"}

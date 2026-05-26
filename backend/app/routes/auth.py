from fastapi import APIRouter, HTTPException

from app.schemas.user_schema import UserRegister

from app.database.mongodb import user_collection

from app.utils.auth import hash_password

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
def register(user: UserRegister):

    # Check if the user already exists
    existing_user = user_collection.find_one({"email": user.email})

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    # if user doesnt exist, hash the password
    hashed_password = hash_password(user.password)

    new_user = {"name": user.name, "email": user.email, "password": hashed_password}

    user_collection.insert_one(new_user)

    return {"message": "User Registered Successfully"}

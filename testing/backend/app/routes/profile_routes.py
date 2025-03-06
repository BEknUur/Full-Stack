from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from sqlalchemy.orm import Session
import os
from app.core.database import get_db
from app.models.user_model import User
from app.schemas.user_schema import UpdateProfileRequest

router = APIRouter()

@router.get("/profile")
def get_profile(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "username": user.username,
        "email": user.email,
        "role": user.role,
        "bio": user.bio,
        "profile_image": user.profile_image
    }


@router.put("/profile")
def update_profile(email: str, update_data: UpdateProfileRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.username = update_data.username
    user.bio = update_data.bio
    if update_data.profile_image:
        user.profile_image = update_data.profile_image

    db.commit()
    db.refresh(user)
    return {"message": "Profile updated successfully"}


@router.post("/profile/upload-image")
def upload_profile_image(email: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.profile_image:
        old_image_path = user.profile_image.lstrip("/")
        if os.path.exists(old_image_path):
            os.remove(old_image_path)

    os.makedirs("uploads", exist_ok=True)
    new_file_name = f"{user.email}_{file.filename}"
    file_location = os.path.join("uploads", new_file_name)
    with open(file_location, "wb") as buffer:
        buffer.write(file.file.read())

    user.profile_image = f"/uploads/{new_file_name}"
    db.commit()

    return {"message": "Image uploaded successfully", "profile_image": user.profile_image}


@router.delete("/profile/remove-image")
def remove_profile_image(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.profile_image:
        old_image_path = user.profile_image.lstrip("/")
        if os.path.exists(old_image_path):
            os.remove(old_image_path)

        user.profile_image = None
        db.commit()

    return {"message": "Profile image removed"}

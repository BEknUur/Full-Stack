from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional
import os
from app.core.database import get_db
from app.models.user_model import User
from app.models.car_model import Car
from app.schemas.car_schema import CarCreate, CarResponse
from app.utils.converters import car_to_response

router = APIRouter()

BASE_URL = "http://localhost:8000"

@router.post("/cars", response_model=CarResponse)
def create_car(email: str, car_data: CarCreate, db: Session = Depends(get_db)):
    owner = db.query(User).filter(User.email == email).first()
    if not owner:
        raise HTTPException(status_code=404, detail="Owner not found")

    new_car = Car(
        owner_email=email,
        brand=car_data.brand,
        name=car_data.name,
        price_per_day=car_data.price_per_day,
        location=car_data.location,
        car_type=car_data.car_type,
        description=car_data.description
    )
    db.add(new_car)
    db.commit()
    db.refresh(new_car)

    return car_to_response(new_car)


@router.post("/cars/{car_id}/upload-image")
def upload_car_image(car_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    car = db.query(Car).filter(Car.id == car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")

    os.makedirs("car_uploads", exist_ok=True)

    file_path = f"car_uploads/car_{car_id}_{file.filename}"
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    car.image_url = f"{BASE_URL}/{file_path}"
    db.commit()

    return {"message": "Image uploaded successfully", "image_url": car.image_url}


@router.get("/cars", response_model=List[CarResponse])
def get_all_cars(db: Session = Depends(get_db)):
    cars = db.query(Car).all()
    return [car_to_response(c) for c in cars]


@router.get("/cars/search", response_model=List[CarResponse])
def search_cars(
    db: Session = Depends(get_db),
    location: Optional[str] = None,
    brand: Optional[str] = None,
    max_price: Optional[float] = None,
    car_type: Optional[str] = None
):
    query = db.query(Car)

    if location:
        query = query.filter(Car.location.ilike(f"%{location}%"))
    if brand:
        query = query.filter(Car.brand.ilike(f"%{brand}%"))
    if max_price is not None:
        query = query.filter(Car.price_per_day <= max_price)
    if car_type:
        query = query.filter(Car.car_type.ilike(f"%{car_type}%"))

    return [car_to_response(c) for c in query.all()]

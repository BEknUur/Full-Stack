from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import bcrypt
import jwt
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

# CORS
origins = ["http://localhost:5173", "http://localhost:5173/"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# MODELS
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="user")

class Car(Base):
    __tablename__ = "cars"
    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    brand = Column(String)
    model = Column(String)
    year = Column(Integer)
    price_per_day = Column(Integer)
    location = Column(String)
    image_url = Column(String, nullable=True)
    available = Column(Boolean, default=True)

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    car_id = Column(Integer, ForeignKey("cars.id"))
    start_date = Column(Date)
    end_date = Column(Date)
    status = Column(String, default="pending")

class Review(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    car_id = Column(Integer, ForeignKey("cars.id"))
    rating = Column(Integer)
    comment = Column(String)

Base.metadata.create_all(bind=engine)



class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    username: str

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class CarSchema(BaseModel):
    brand: str
    model: str
    year: int
    price_per_day: int
    location: str
    image_url: Optional[str] = None

class BookingSchema(BaseModel):
    car_id: int
    start_date: str
    end_date: str

class ReviewSchema(BaseModel):
    car_id: int
    rating: int
    comment: str

class UpdateProfileSchema(BaseModel):
    username: str
    phone: str
    bio: str


# PASSWORD AND JWT
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed_password.encode())

def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=1)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")


#  ENDPOINTS
@app.post("/auth/register", response_model=TokenResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)

    new_user = User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({"sub": new_user.email})
    return {"access_token": token, "token_type": "bearer", "username": new_user.username}


@app.post("/auth/login", response_model=TokenResponse)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer", "username": user.username}


# PROFILE ENDPOINTS
@app.get("/profile")
def get_profile(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"username": user.username, "email": user.email, "role": user.role}


# CAR ENDPOINTS
@app.get("/cars", response_model=List[CarSchema])
def get_cars(db: Session = Depends(get_db)):
    return db.query(Car).all()

@app.get("/my-cars", response_model=List[CarSchema])
def get_my_cars(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return db.query(Car).filter(Car.owner_id == user.id).all()

@app.post("/cars/add")
def add_car(car: CarSchema, email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_car = Car(owner_id=user.id, **car.dict())
    db.add(new_car)
    db.commit()
    return {"message": "Car added successfully"}

@app.delete("/cars/{car_id}/delete")
def delete_car(car_id: int, email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    car = db.query(Car).filter(Car.id == car_id, Car.owner_id == user.id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found or not owned by you")
    db.delete(car)
    db.commit()
    return {"message": "Car deleted successfully"}


# BOOKING ENDPOINTS
@app.post("/bookings/create")
def create_booking(booking: BookingSchema, email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    new_booking = Booking(user_id=user.id, **booking.dict())
    db.add(new_booking)
    db.commit()
    return {"message": "Booking created successfully"}


# REVIEW ENDPOINTS
@app.post("/reviews/add")
def add_review(review: ReviewSchema, email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    new_review = Review(user_id=user.id, **review.dict())
    db.add(new_review)
    db.commit()
    return {"message": "Review added successfully"}


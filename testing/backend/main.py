from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from pydantic import BaseModel
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import bcrypt
import jwt
from fastapi.staticfiles import StaticFiles
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List

Base = declarative_base()

# ---------- MODELS ------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="user")
    bio = Column(String, nullable=True)
    profile_image = Column(String, nullable=True)

class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    sender_email = Column(String, ForeignKey("users.email"))
    text = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class Car(Base):
    __tablename__ = "cars"
    id = Column(Integer, primary_key=True, index=True)
    owner_email = Column(String, ForeignKey("users.email"))  # Владелец машины
    brand = Column(String, nullable=True)  # <-- Добавил поле brand
    name = Column(String, nullable=True)   # <-- Существующее поле, если хочешь сохранить
    price_per_day = Column(Float, nullable=False)
    location = Column(String, nullable=False)
    car_type = Column(String, nullable=False)
    description = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# ---------- INIT ------------
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["http://localhost:5173"] 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------- SCHEMAS ------------
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

class UpdateProfileRequest(BaseModel):
    username: str
    bio: Optional[str] = None
    profile_image: Optional[str] = None

class MessageCreate(BaseModel):
    sender_email: str
    text: str

class MessageResponse(BaseModel):
    sender_email: str
    text: str
    timestamp: datetime

class CarCreate(BaseModel):
    brand: Optional[str] = None   
    name: Optional[str] = None    
    price_per_day: float
    location: str
    car_type: str
    description: Optional[str] = None

class CarResponse(BaseModel):
    id: int
    owner_email: str
    brand: Optional[str] = None
    name: Optional[str] = None
    price_per_day: float
    location: str
    car_type: str
    description: Optional[str]
    image_url: Optional[str]
    created_at: datetime

# ---------- UTILS (hash, verify, tokens) ------------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed_password.encode())

def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=1)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")

# ---------- HELPER to convert Car -> CarResponse ----
def car_to_response(car) -> CarResponse:
    return CarResponse(
        id=car.id,
        owner_email=car.owner_email,
        brand=car.brand,
        name=car.name,
        price_per_day=car.price_per_day,
        location=car.location,
        car_type=car.car_type,
        description=car.description,
        image_url=car.image_url,
        created_at=car.created_at,
    )

# ---------- AUTH ------------
@app.post("/auth/register", response_model=TokenResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pass = hash_password(user.password)
    new_user = User(username=user.username, email=user.email, hashed_password=hashed_pass)
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

# ---------- PROFILE ------------
@app.get("/profile")
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

@app.put("/profile")
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

@app.post("/profile/upload-image")
def upload_profile_image(email: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.profile_image:
        old_image_path = user.profile_image.lstrip("/")  
        if os.path.exists(old_image_path):
            os.remove(old_image_path)

    # Сохраняем новое фото
    os.makedirs("uploads", exist_ok=True)  
    new_file_name = f"{user.email}_{file.filename}"
    file_location = os.path.join("uploads", new_file_name)
    with open(file_location, "wb") as buffer:
        buffer.write(file.file.read())

    user.profile_image = f"/uploads/{new_file_name}"
    db.commit()

    return {"message": "Image uploaded successfully", "profile_image": user.profile_image}

@app.delete("/profile/remove-image")
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

# ---------- CHAT ------------
@app.post("/chat/send", response_model=MessageResponse)
def send_message(message: MessageCreate, db: Session = Depends(get_db)):
    sender = db.query(User).filter(User.email == message.sender_email).first()
    if not sender:
        raise HTTPException(status_code=404, detail="Sender not found")

    new_message = Message(sender_email=message.sender_email, text=message.text)
    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return MessageResponse(
        sender_email=new_message.sender_email,
        text=new_message.text,
        timestamp=new_message.timestamp
    )

@app.get("/chat/messages", response_model=List[MessageResponse])
def get_all_messages(db: Session = Depends(get_db)):
    messages = db.query(Message).order_by(Message.timestamp).all()
    return [
        MessageResponse(
            sender_email=m.sender_email,
            text=m.text,
            timestamp=m.timestamp
        ) for m in messages
    ]

# ---------- CARS (Create, Upload image, Get all) ------------
@app.post("/cars", response_model=CarResponse)
def create_car(email: str, car_data: CarCreate, db: Session = Depends(get_db)):
    """Создаём новую машину, привязанную к owner_email = email."""
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

BASE_URL = "http://localhost:8000"

@app.post("/cars/{car_id}/upload-image")
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


@app.get("/cars", response_model=List[CarResponse])
def get_all_cars(db: Session = Depends(get_db)):
    """Возвращаем список всех машин."""
    cars = db.query(Car).all()
    return [car_to_response(c) for c in cars]


@app.get("/cars/search", response_model=List[CarResponse])
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

    results = query.all()
    return [car_to_response(c) for c in results]

# ---------- STATIC FILES -----------
app.mount("/car_uploads", StaticFiles(directory="car_uploads"), name="car_uploads")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

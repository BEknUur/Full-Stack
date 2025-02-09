from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional, List
from uuid import uuid4

app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 10
REFRESH_TOKEN_EXPIRE_DAYS = 7

users = {}
active_refresh_tokens = {}
used_refresh_tokens = {}

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class Car(BaseModel):
    id: int
    brand: str
    model: str
    year: int
    price_per_day: float
    description: str

cars: List[dict] = []

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None or email not in users:
            raise HTTPException(status_code=401, detail="Invalid token or user")
        return users[email]
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/auth/register")
def register(user: UserRegister):
    if len(user.password) < 6:
        raise HTTPException(status_code=400, detail="Пароль должен содержать минимум 6 символов")
    if user.email in users:
        raise HTTPException(status_code=400, detail="Пользователь с таким email уже зарегистрирован")
    if user.role not in ["admin", "user"]:
        raise HTTPException(status_code=400, detail="Роль должна быть 'admin' или 'user'")
    user_id = str(uuid4())
    hashed_password = hash_password(user.password)
    users[user.email] = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "role": user.role,
        "user_id": user_id
    }
    return {"message": "Регистрация успешна", "user_id": user_id}

@app.post("/auth/login", response_model=Token)
def login(user: UserLogin):
    if user.email not in users:
        raise HTTPException(status_code=400, detail="Неверный email или пароль")
    stored_user = users[user.email]
    if not verify_password(user.password, stored_user["password"]):
        raise HTTPException(status_code=400, detail="Неверный email или пароль")
    access_token = create_access_token(data={"sub": user.email, "role": stored_user["role"]})
    refresh_token = create_refresh_token(data={"sub": user.email, "role": stored_user["role"]})
    if user.email in active_refresh_tokens:
        old_token = active_refresh_tokens[user.email]
        used_refresh_tokens[old_token] = datetime.utcnow()
    active_refresh_tokens[user.email] = refresh_token
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}

@app.post("/auth/refresh", response_model=Token)
def refresh_token_endpoint(refresh_token: str):
    if refresh_token in used_refresh_tokens:
        raise HTTPException(status_code=401, detail="Refresh token is not active")
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None or email not in users:
            raise HTTPException(status_code=401, detail="Invalid token or user")
        if datetime.utcnow() > datetime.utcfromtimestamp(payload["exp"]):
            raise HTTPException(status_code=401, detail="Refresh token has expired")
        used_refresh_tokens[refresh_token] = datetime.utcnow()
        new_access_token = create_access_token(data={"sub": email, "role": users[email]["role"]})
        new_refresh_token = create_refresh_token(data={"sub": email, "role": users[email]["role"]})
        active_refresh_tokens[email] = new_refresh_token
        return {"access_token": new_access_token, "refresh_token": new_refresh_token, "token_type": "bearer"}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

@app.post("/auth/logout")
def logout_user(user: dict = Depends(verify_token)):
    email = user["email"]
    if email in active_refresh_tokens:
        del active_refresh_tokens[email]
    return {"message": "Successfully logged out"}

@app.get("/auth/users")
def get_users():
    if not users:
        raise HTTPException(status_code=404, detail="Нет зарегистрированных пользователей")
    return {"registered_users": [{"email": email, "name": data["name"], "role": data["role"]} for email, data in users.items()]}

@app.get("/admin")
def admin(token: dict = Depends(verify_token)):
    if token["role"] != "admin":
        raise HTTPException(status_code=403, detail="Нет доступа, требуется роль администратора")
    return {"message": f"Hello, {token['name']}! You have admin access."}

@app.get("/user-check")
def user_check(token: dict = Depends(verify_token)):
    if token["role"] != "user":
        raise HTTPException(status_code=403, detail="Нет доступа, требуется роль пользователя")
    return {"message": f"Hello, {token['name']}! You have user access."}

@app.get("/me")
def me(token: dict = Depends(verify_token)):
    return {"name": token["name"], "email": token["email"], "role": token["role"]}

@app.post("/cars")
def create_car(car: Car, user: dict = Depends(verify_token)):
    new_car = {
        "id": len(cars) + 1,
        "brand": car.brand,
        "model": car.model,
        "year": car.year,
        "price_per_day": car.price_per_day,
        "description": car.description,
        "owner": user["email"]
    }
    cars.append(new_car)
    return {"message": "Car created", "car": new_car}

@app.get("/cars")
def list_cars(user: dict = Depends(verify_token)):
    user_cars = [c for c in cars if c["owner"] == user["email"]]
    return {"cars": user_cars}

@app.get("/cars/{car_id}")
def get_car(car_id: int, user: dict = Depends(verify_token)):
    car = next((c for c in cars if c["id"] == car_id and c["owner"] == user["email"]), None)
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    return {"car": car}

@app.put("/cars/{car_id}")
def update_car(car_id: int, car: Car, user: dict = Depends(verify_token)):
    existing_car = next((c for c in cars if c["id"] == car_id and c["owner"] == user["email"]), None)
    if not existing_car:
        raise HTTPException(status_code=404, detail="Car not found")
    existing_car.update({
        "brand": car.brand,
        "model": car.model,
        "year": car.year,
        "price_per_day": car.price_per_day,
        "description": car.description
    })
    return {"message": "Car updated", "car": existing_car}

@app.delete("/cars/{car_id}")
def delete_car(car_id: int, user: dict = Depends(verify_token)):
    global cars
    if not any(c for c in cars if c["id"] == car_id and c["owner"] == user["email"]):
        raise HTTPException(status_code=404, detail="Car not found")
    cars = [c for c in cars if not (c["id"] == car_id and c["owner"] == user["email"])]
    return {"message": "Car deleted"}

from fastapi import FastAPI, HTTPException, status, Depends
import bcrypt
from pydantic import BaseModel, EmailStr, Field
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta

app = FastAPI()
users = [] 

SECRET_KEY = "Beknur"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def verify_access_token(token: str):
    try:
       
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid or expired token")

class UserRegistration(BaseModel):
    name: str = Field(min_length=1, description="The name must contain at least 1 letter")
    email: EmailStr
    password: str = Field(min_length=6, description="The password must contain at least 6 symbols")
    role: str = Field(description="The role of user")

class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)

@app.post("/auth/register", status_code=status.HTTP_201_CREATED)
async def register_user(user: UserRegistration):
    if any(u["email"] == user.email for u in users):
        return {"message": "Email already exists"}
    
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    new_user = {
        "id": len(users) + 1,
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "role": user.role
    }
    users.append(new_user)
    return {"message": "User successfully registered"}

@app.post("/auth/login")
async def user_login(user: UserLogin):
    user_example = next((u for u in users if u["email"] == user.email), None)
    if not user_example:
        return {"error": "Invalid email or password"}
    
    if not bcrypt.checkpw(user.password.encode('utf-8'), user_example["password"].encode('utf-8')):
       return {"error": "Invalid email or password"}
    
    token = create_access_token({
        "sub": user_example["email"],
        "role": user_example["role"],
        "name": user_example["name"],
        "id": user_example["id"]
    })
    return {"access_token": token, "token_type": "bearer"}

@app.get("/protected")
def protected_route(token: str = Depends(oauth2_scheme)):
    user_data = verify_access_token(token)
    return {"message": f"Welcome, your role is {user_data['role']}"}

@app.get("/me")
def get_current_user(token: str = Depends(oauth2_scheme)):
    user_data = verify_access_token(token)
    return {
        "email": user_data["sub"],
        "name": user_data["name"],
        "role": user_data["role"]
    }



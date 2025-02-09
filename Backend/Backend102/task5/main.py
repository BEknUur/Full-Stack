from fastapi import FastAPI, HTTPException, status
import bcrypt
from pydantic import BaseModel, EmailStr, Field

app = FastAPI()
users = [] 

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
        return {"message":"Email already exists"}
    
  
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
        return {"error":"Invalid email or password"}
    
 
    if not bcrypt.checkpw(user.password.encode('utf-8'), user_example["password"].encode('utf-8')):
       return {"error":"Invalid email or password"}
    

    return {"message": f"Welcome, {user_example['name']}"}



from fastapi import FastAPI,HTTPException,status

from pydantic import BaseModel,EmailStr,Field

app=FastAPI()

users=[]

class UserRegistration(BaseModel):
    name:str=Field(min_length=1,description="The name must contain at least 1 letter")
    email:EmailStr
    password:str=Field(min_length=6,description="The password must contain at least 6 simbols")
    role:str=Field(description="The role of user")



class UserLogin(BaseModel):
    email:EmailStr
    password:str=Field(min_length=6)


@app.post("/auth/register",status_code=status.HTTP_201_CREATED)
async def regsiter_user(user:UserRegistration):
        if any(u["email"]==user.email for u in users):
             raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Email is already exist")
        
        new_user={
            "id":len(users)+1,
            "name":user.name,
            "email":user.email,
            "password":user.password,
            "role":user.role 
        }
        users.append(new_user)
        return {"message":"User successfully registred"}



@app.post("/auth/login")
async def login_user(user:UserLogin):
        user_example=next((u for u in users if u["email"]==user.email),None)
        if not user_example or user_example["password"]!=user.password:
              raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Invalid email or password")
        
        return {"message":f"Welcome,{user_example["name"]}!"}


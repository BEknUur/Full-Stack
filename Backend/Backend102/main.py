from fastapi import FastAPI,HTTPException,Form,File,UploadFile,status
from pydantic import BaseModel, Field, field_validator, EmailStr, conint ,constr
from pydantic.types import constr
users = [
    {"id": 1, "name": "Adilet", "email": "adilet@example.com", "role": "admin"},
    {"id": 2, "name": "Anuar", "email": "anuar@example.com", "role": "user"}
]


app=FastAPI()
class User(BaseModel):
   id:int
   name:str
   email:EmailStr
   role:str


@app.get("/health")
async def health_check():
   return {"check":"ok"}

@app.post("/users",response_model=User,status_code=status.HTTP_201_CREATED)
async def create_user(user: User):
    for existing_user in users:
       if existing_user["email"]==user.email:
          raise HTTPException(
          status_code=status.HTTP_400_BAD_REQUEST,detail=f"Email {user.email} is already exist"
         )
      

    new_user= {
   "id":user.id,
   "name":user.name,
   "email":user.email,
   "role":user.role
       
    }
    users.append(new_user)
    return new_user


@app.get("/users",response_model=list[User])
async def get_users():
   return users


   
@app.get("/users/{user_id}", response_model=User)
async def get_id(user_id: int):
    for user in users:
        if user["id"] == user_id:
            return user

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="The user not found"
    )

   

@app.put("/users/{user_id}", response_model=User)
async def update_user(user_id: int, updated_data: User):
    for idx, existing_user in enumerate(users):
        if existing_user["id"] == user_id:
            if updated_data.email != existing_user["email"]:
                for other_user in users:
                    if other_user["email"] == updated_data.email:
                        raise HTTPException(
                            status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Email '{updated_data.email}' is already in use."
                        )
       
            users[idx] = {
                "id": user_id, 
                "name": updated_data.name,
                "email": updated_data.email,
                "role": updated_data.role
            }
            return users[idx]


    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found"
    )




@app.delete("/users/{user_id}",status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id:int): 
    for idx, user in enumerate(users):
        if user["id"]==user_id:
            del users[idx]
            return
    raise HTTPException(
         status_code=status.HTTP_404_NOT_FOUND, detail="User is not found"
      )

   





'''
@app.get("/login/")
async def login(username:str=Form(),password:str=Form()):
    return{"username":username,"message":"Login successful"}

@app.post("/upload_user/")
async def upload(file:UploadFile=File()):
    return {"filename":file.filename}

@app.post("/savefile/")
async def saveFile(file:UploadFile=File()):
    with open(f'uploads/{file.filename}',"wb")as f:
        f.write(file.file.read())

    return {"message":f"File '{file.filename}' saved succesfully!"}    


from typing import List
@app.post("/uploadfiles/")
async def uploadFiles(files:List[UploadFile]=File()):
    return {"filenames":[file.filename for file in files]}






@app.get("/")
def name():
    return {"message": "Hello World!"}
    

@app.post("/items")
def create_item(name:str,price:int):
    return {"name":name,"price":price}


@app.put("/items/{item_id}")
def update_item(item_id:int,name:str,price:int):
    return {"id":item_id,"name":name,"price":price}

@app.delete("/items/{item_id}")
def delete_item(item_id:int):
    return{"Deleted item with the id":item_id}


#Path
@app.get("/users/{user_id}")
def get_id(user_id:int):
    return {"user_id":user_id}


#Query parameter
@app.get("/users/")
def get_fio(name:str,age:int):
    return{"name":name,"age":age}


#Path parameter+Query Parameter
@app.get("/users/{user_id}/detail")
def get_email(user_id:int,email:bool=False):
    if email:
        return {"the id":user_id,"email":" YES"}
    else:
        return {"the id":user_id,"email":"NO"}



        #Wooorking with the Pydantic and etch with the field_validator where we cheeck we have name or not 
        #and if we didn't write the name there were an errors as the "name must be the filled"

class User(BaseModel):
    username: Annotated[
        str, 
        constr(
            pattern=r'^[a-zA-Z0-9.-]+$',
            min_length=3,
            max_length=50
        )
    ]
    email: EmailStr
    age: Annotated[
        int,
        conint(ge=0, le=150)
    ]

    @field_validator('username')
    def validate_username(cls, v: str) -> str:
        if ' ' in v:
            raise ValueError("Username cannot contain spaces")
        if not v[0].isalpha():
            raise ValueError("Username must start with a letter")
        return v.lower()  # Normalize usernames to lowercase

    @field_validator('age')
    def validate_reasonable_age(cls, v: int) -> int:
        if v < 13:
            raise ValueError("User must be at least 13 years old")
        return v

@app.post("/register", response_model=User)
async def register(user: User):
    try:
        # Here you would typically:
        # 1. Check if username/email already exists in database
        # 2. Hash the password (if implemented)
        # 3. Store user in database
        
        return user
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
    

'''
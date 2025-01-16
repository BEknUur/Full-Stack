from fastapi import FastAPI ,Depends,HTTPException
from sqlalchemy.orm import Session
from database import Base,engine,get_db
from models import User
from schemas import UserCreate, UserOut
from utils import hash_password ,verify_password
 
Base.metadata.create_all(bind=engine)

app=FastAPI()

@app.post("/register",response_model=UserOut)
def register(user:UserCreate,db: Session=Depends(get_db)):
    db_user=db.query(User).filter(User.email==user.email).first()
    if db_user:
        raise HTTPException(status_code=400,detail="Email already registred")
    
    new_user=User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login")
def login(email:str,password:str,db:Session=Depends(get_db)):
    db_user=db.query(User).filter(User.email==email).first()
    if not db_user or not verify_password(password,db_user.hashed_password):
        raise HTTPException(status_code=401,detail="Invalid operations")
    return {"message":"Login Succesfull","user_id":db_user.id}
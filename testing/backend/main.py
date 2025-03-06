from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from app.core.config import settings
import os
from app.core.database import Base, engine
from app.routes import auth_routes, profile_routes, chat_routes, car_routes

load_dotenv()
Base.metadata.create_all(bind=engine)
    

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/car_uploads", StaticFiles(directory="car_uploads"), name="car_uploads")

app.include_router(auth_routes.router)
app.include_router(profile_routes.router)
app.include_router(chat_routes.router)
app.include_router(car_routes.router)

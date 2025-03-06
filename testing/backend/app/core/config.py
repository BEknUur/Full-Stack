import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL")
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALLOWED_ORIGINS = [
        "http://localhost:5173",  # фронтенд в dev режиме
    ]

settings = Settings()

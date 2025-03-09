from sqlalchemy import Column, Integer, String
from app.core.base import Base  
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="user")
    bio = Column(String, nullable=True)
    profile_image = Column(String, nullable=True)

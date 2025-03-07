from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.base import Base

class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    sender_email = Column(String, ForeignKey("users.email"))
    text = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    image_url=Column(String,nullable=True)

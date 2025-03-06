from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.base import Base

class Car(Base):
    __tablename__ = "cars"
    id = Column(Integer, primary_key=True, index=True)
    owner_email = Column(String, ForeignKey("users.email"))
    brand = Column(String, nullable=True)
    name = Column(String, nullable=True)
    price_per_day = Column(Float, nullable=False)
    location = Column(String, nullable=False)
    car_type = Column(String, nullable=False)
    description = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

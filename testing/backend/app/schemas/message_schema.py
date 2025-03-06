from pydantic import BaseModel
from datetime import datetime

class MessageCreate(BaseModel):
    sender_email: str
    text: str

class MessageResponse(BaseModel):
    sender_email: str
    text: str
    timestamp: datetime

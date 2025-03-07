from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class MessageCreate(BaseModel):
    sender_email: str
    text: str

class MessageResponse(BaseModel):
    sender_email: str
    text: str
    timestamp: datetime
    file_url:Optional[str]=None

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.user_model import User
from app.models.message_model import Message
from app.schemas.message_schema import MessageCreate, MessageResponse

router = APIRouter()

@router.post("/chat/send", response_model=MessageResponse)
def send_message(message: MessageCreate, db: Session = Depends(get_db)):
    sender = db.query(User).filter(User.email == message.sender_email).first()
    if not sender:
        raise HTTPException(status_code=404, detail="Sender not found")

    new_message = Message(sender_email=message.sender_email, text=message.text)
    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return MessageResponse(
        sender_email=new_message.sender_email,
        text=new_message.text,
        timestamp=new_message.timestamp
    )


@router.get("/chat/messages", response_model=List[MessageResponse])
def get_all_messages(db: Session = Depends(get_db)):
    messages = db.query(Message).order_by(Message.timestamp).all()
    return [
        MessageResponse(
            sender_email=m.sender_email,
            text=m.text,
            timestamp=m.timestamp
        ) for m in messages
    ]

from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.user_model import User
from app.models.message_model import Message
from app.schemas.message_schema import MessageCreate, MessageResponse
import os
from datetime import datetime

router = APIRouter()

UPLOAD_DIR = "uploads/chat_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/chat/send", response_model=MessageResponse)
def send_message(message: MessageCreate, db: Session = Depends(get_db)):
    sender = db.query(User).filter(User.email == message.sender_email).first()
    if not sender:
        raise HTTPException(status_code=404, detail="Sender not found")

    new_message = Message(
        sender_email=message.sender_email,
        text=message.text,
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return MessageResponse(
        sender_email=new_message.sender_email,
        text=new_message.text,
        timestamp=new_message.timestamp,
    )


@router.post("/chat/send-with-file", response_model=MessageResponse)
def send_message_with_file(
    sender_email: str = Form(...),
    text: str = Form(""),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    sender = db.query(User).filter(User.email == sender_email).first()
    if not sender:
        raise HTTPException(status_code=404, detail="Sender not found")

    file_url = None

    if file:
        file_ext = os.path.splitext(file.filename)[1]
        file_name = f"chat_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}{file_ext}"
        file_path = os.path.join(UPLOAD_DIR, file_name)

        with open(file_path, "wb") as buffer:
            buffer.write(file.file.read())

        file_url = f"/uploads/chat_files/{file_name}"

    new_message = Message(
        sender_email=sender_email,
        text=text,
        image_url=file_url,
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return MessageResponse(
        sender_email=new_message.sender_email,
        text=new_message.text,
        timestamp=new_message.timestamp,
    )


@router.get("/chat/messages", response_model=List[MessageResponse])
def get_all_messages(db: Session = Depends(get_db)):
    messages = db.query(Message).order_by(Message.timestamp).all()
    return [
        MessageResponse(
            sender_email=m.sender_email,
            text=m.text,
            timestamp=m.timestamp,
            file_url=m.image_url  
        ) for m in messages
    ]

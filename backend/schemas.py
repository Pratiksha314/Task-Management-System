from typing import List, Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr
    hashed_password: str

class UserCreate(UserBase):
    pass

class UserLogin(BaseModel):
    email: EmailStr
    hashed_password: str

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    username: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Base fields shared across input and output
class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    owner_username: str

# 1. Incoming Request: FE only sends this (No id or created_at)
class ProjectCreate(ProjectBase):
    pass

# 2. Outgoing Response: BE returns this (Includes auto-generated fields)
class ProjectResponse(ProjectBase):
    id: str
    created_at: datetime

class TaskBase(BaseModel):
    project_id: str
    project_name: str
    title: str
    description: Optional[str] = None
    status: Optional[str] = "To Do"  # Default status
    assigned_to: Optional[str] = None  # username of the assigned user
    due_date: Optional[datetime] = None
    priority: Optional[str] = "Low"  # Default priority

class TaskCreate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: str
    created_at: datetime = datetime.utcnow()

    
class CommentBase(BaseModel):
    task_id: str
    user_name: str  # Username of the commenter
    comment: str

class CommentCreate(CommentBase):
    pass

class CommentResponse(CommentBase):
    id: str
    created_at: datetime = datetime.utcnow()

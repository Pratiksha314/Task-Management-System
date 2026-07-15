from datetime import datetime
from enum import Enum
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import uuid

class Task(Base):
    __tablename__ = "tasks"

    id = Column(String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String, ForeignKey("projects.id"))
    project_name = Column(String)
    title = Column(String, index=True)
    description = Column(String, index=True)
    status = Column(String, index=True)  # Could be "To Do", "In Progress", "Done", etc.
    assigned_to = Column(String, ForeignKey("users.username"), nullable=True)  # User ID of the assigned user
    due_date = Column(DateTime, nullable=True)
    priority = Column(String, index=True)  # Could be "Low", "Medium", "High"
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="task_list")
    assigned_user = relationship("User", back_populates="assigned_tasks")  # Assuming a User model exists
    comments = relationship("Comment", back_populates="task")  # Assuming a Comment model exists

class Comment(Base):
    __tablename__ = "comments"

    id = Column(String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    task_id = Column(String, ForeignKey("tasks.id"))
    user_name = Column(String, ForeignKey("users.username"))  # User ID of the commenter
    comment = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    task = relationship("Task", back_populates="comments")
    user = relationship("User", back_populates="comments")  # Assuming a User model exists
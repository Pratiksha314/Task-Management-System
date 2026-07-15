from sqlalchemy import Column, String, DateTime
from database import Base
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    project_list = relationship("Project", back_populates="owner")  # Assuming a Project model exists
    assigned_tasks = relationship("Task", back_populates="assigned_user")  # Assuming a Task model exists
    comments = relationship("Comment", back_populates="user")  # Assuming a Comment model exists
    

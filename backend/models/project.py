from datetime import datetime
from database import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
import uuid

class Project(Base):
    __tablename__ = "projects"

    id = Column(String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, index=True)
    description = Column(String, index=True)
    owner_username = Column(String, ForeignKey("users.username"))
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="project_list")
    task_list = relationship("Task", back_populates="project", cascade="all, delete-orphan")
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, SessionLocal
from models.user import User
from models.task import Task
from models.project import Project
from routers import projects, tasks, comments, users

app = FastAPI(title="Task Management System", description="A simple task management system built with FastAPI and Angular", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # allow all methods
    allow_headers=["*"],  # allow all headers
)

Base.metadata.create_all(bind=engine)  # Create database tables based on models

app.include_router(projects.router)
app.include_router(tasks.router)
app.include_router(comments.router)
app.include_router(users.router)

# def init_db():
#     db = SessionLocal()
#     count = db.query(Project).count()
#     if count == 0:
#         for project in projects.projects:
#             db_project = Project(
#                 id=project.id,
#                 name=project.name,
#                 description=project.description,
#                 owner_id=project.owner_id,
#                 members=project.members,
#                 created_at=project.created_at
#             )
#             db.add(db_project)
#         db.commit()
#         db.close()

# init_db()  # Initialize the database with sample projects
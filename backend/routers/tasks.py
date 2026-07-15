from fastapi import APIRouter, Depends, HTTPException
from models.task import Task
from database import get_db
from sqlalchemy.orm import Session
import schemas

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/project/{project_id}/tasks", response_model=list[schemas.TaskResponse])
def get_tasks_by_project_id(project_id: str, db: Session = Depends(get_db)):
    return db.query(Task).filter(Task.project_id == project_id).all()

@router.post("/", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskBase, db: Session = Depends(get_db)):
    db_task = Task(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.patch("/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: str, task: schemas.TaskResponse, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    for key, value in task.model_dump().items():
        setattr(db_task, key, value)
    db.commit()
    db.refresh(db_task)
    return db_task
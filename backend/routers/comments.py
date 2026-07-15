from fastapi import APIRouter, Depends, HTTPException
from models.task import Comment
from database import get_db
from sqlalchemy.orm import Session
import schemas

router = APIRouter(prefix="/comments", tags=["comments"])

@router.get("/task/{task_id}/comments", response_model=list[schemas.CommentResponse])
def get_comments_by_task_id(task_id: str, db: Session = Depends(get_db)):
    db_comments = db.query(Comment).filter(Comment.task_id == task_id).all()
    if not db_comments:
        raise HTTPException(status_code=404, detail="No comments found for this task")
    return db_comments

@router.post("/", response_model=schemas.CommentResponse)
def create_comment(comment: schemas.CommentCreate, db: Session = Depends(get_db)):
    db_comment = Comment(**comment.model_dump())
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment
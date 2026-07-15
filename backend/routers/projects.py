from fastapi import APIRouter, Depends
from models.project import Project
from database import get_db
from sqlalchemy.orm import Session
import schemas

router = APIRouter(prefix="/projects", tags=["projects"])

# projects = [
#  Project(id=1, name="Website Redesign", description="Ecommerce UI refresh with new visual system and responsive layouts.", owner_id=1, members=["Alice", "Suga"], created_at="2026-05-01T00:00:00Z"),
#  Project(id=2, name="Mobile App Launch", description="Prepare launch assets, onboarding flows, and app store release plan.", owner_id=1, members=["Charlie", "Suga", "Eve"], created_at="2025-10-05T00:00:00Z"),
#  Project(id=3, name="Marketing Campaign", description="Develop a comprehensive marketing strategy for the new product line.", owner_id=2, members=["Frank", "Kim Namjoon"], created_at="2025-12-15T00:00:00Z"),
#  Project(id=4, name="Data Analytics Dashboard", description="Create a dashboard to visualize key metrics and KPIs for stakeholders.", owner_id=3, members=["Jimin", "Ivan"], created_at="2026-01-20T00:00:00Z")    
# ]

@router.get("/", response_model=list[schemas.ProjectResponse])
async def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()

@router.post("/", response_model=schemas.ProjectResponse, status_code=201)
async def create_project(new_project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    db_project = Project(**new_project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project
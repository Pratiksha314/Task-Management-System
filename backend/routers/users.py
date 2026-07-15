from fastapi import APIRouter, Depends, HTTPException, status
from models.user import User
from database import get_db
from sqlalchemy.orm import Session
import schemas
import auth

router = APIRouter(prefix='/user', tags=["users"])

# @router.get("/{user_id}", response_model=schemas.UserResponse)
# def get_user_details_by_username(username: str, db: Session = Depends(get_db)):
#     db_user = db.query(User).filter(User.username == username).first();
#     if not db_user:
#         raise HTTPException(status_code=404, detail="No user found for the given id")
#     return db_user

def get_user_by_email(email: str, db: Session) :
    return db.query(User).filter(User.email == email).first()

def create_user(user: schemas.UserCreate, db: Session) -> User:
    db_user = User(
        email= user.email,
        hashed_password= auth.hash_password(user.hashed_password),
        username=user.username,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(email, db) 
    if not user or not auth.verify_password(password, user.hashed_password):
        return None
    return user

@router.post("/signup", response_model=schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = get_user_by_email(user.email, db)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(user, db)

@router.post('/login', response_model=schemas.Token)
def login(credentials: schemas.UserLogin, db:Session = Depends(get_db)):
    user = authenticate_user(db, credentials.email, credentials.hashed_password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password",)
    token = auth.create_access_token(data= {"sub": user.email })
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me", response_model=schemas.UserResponse)
def read_current_user(current_user: User = Depends(auth.get_current_user)):
    return current_user

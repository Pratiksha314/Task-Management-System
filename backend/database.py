# Database configuration and connection setup

# 1. Import necessary libraries
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 2. Define the database URL for connecting to a PostgreSQL database
DATABASE_URL = "postgresql://postgres:jungkook%40314@localhost:5432/task_management_db"

# 3. Create the SQLAlchemy engine for database interactions
engine = create_engine(DATABASE_URL)

# 4. Create a session factory for database operations/sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 5. Create the base class for declarative models
Base = declarative_base()

# 6. Dependency function to get a database session for FastAPI endpoints
def get_db():
    db = SessionLocal()  # Create a new database session
    try:
        yield db  # Yield the session to be used in the endpoint
    finally:
        db.close()  # Ensure the session is closed after use

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL jo aapne provide kiya tha
DATABASE_URL = "postgresql+psycopg2://crypto_develop_admin:CryptoAdmin%40786@31.97.10.109:1500/outsource_develop"

# Connection Engine
engine = create_engine(DATABASE_URL)

# Session Setup
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base Model
Base = declarative_base()

# Dependency (Har request ke liye DB session open/close karne ke liye)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
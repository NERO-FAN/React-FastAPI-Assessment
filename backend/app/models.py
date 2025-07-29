from sqlalchemy import Boolean, Column, Date, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    firstName = Column(String(255), nullable=False)
    lastName = Column(String(255), nullable=False)
    dob = Column(Date, unique=True, nullable=False)

from datetime import date, datetime
from pydantic import BaseModel

class UserBase(BaseModel):
    firstName: str
    lastName: str
    dob: date

class UserCreate(UserBase):
    pass 


class User(UserBase):
    id : int

    class Config:
        orm_model = True
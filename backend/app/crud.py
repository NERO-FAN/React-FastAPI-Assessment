from sqlalchemy.orm import Session

from . import models, schemas

def get_users(db: Session):
    return db.query(models.User).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(firstName=user.firstName,
                          lastName=user.lastName,
                          dob=user.dob)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# NOTE :
# - add that instance object to your database session.
# - commit the changes to the database (so that they are saved).
# - refresh your instance (so that it contains any new data from the database, like the generated ID).
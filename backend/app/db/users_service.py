from sqlalchemy.orm import Session

from app.db.models import User


def get_user_by_id(session: Session, user_id: int):
    return session.query(User).filter(User.id == user_id).one()

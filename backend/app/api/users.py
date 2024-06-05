from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import users_service
from app.db.database import get_async_session
from app.schemas.users import UserRead

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


# @router.post("/profile/{id}", response_model=UserRead)
# def profile(user_id: int, session: Session = Depends(get_async_session), token: str = Depends(oauth2_scheme)):
#     return users_service.get_user_by_id(session, user_id)



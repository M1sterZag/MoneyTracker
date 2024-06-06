from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.utils.password_utils import hash_password
from app.db.models import User
from app.schemas.users import UserCreate


async def get_user_by_username(db: AsyncSession, username: str) -> User:
    result = await db.execute(select(User).filter(User.username == username))
    return result.scalars().first()


async def get_user_by_id(db: AsyncSession, user_id: int) -> User:
    result = await db.execute(select(User).filter(User.id == user_id))
    return result.scalars().first()


async def create_user(db: AsyncSession, user: UserCreate) -> User:
    hashed_password = hash_password(user.hashed_password)
    db_user = User(
        username=user.username,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

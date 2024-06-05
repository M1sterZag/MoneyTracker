import base64

import bcrypt
from fastapi import Form, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from jwt import InvalidTokenError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import jwt_utils
from app.db.database import get_async_session
from app.db.models import User
from app.schemas.users import UserSchema, UserCreate

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/login/",
)


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode(), salt)
    return base64.b64encode(hashed).decode()


def validate_password(password: str, hashed_password: str) -> bool:
    hashed_password_bytes = base64.b64decode(hashed_password.encode())
    return bcrypt.checkpw(password.encode(), hashed_password_bytes)


async def validate_auth_user(
        username: str = Form(),
        password: str = Form(),
        db: AsyncSession = Depends(get_async_session)
):
    unauthed_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid username or password",
    )
    db_user = await get_user_by_username(db, username)
    if not db_user or not validate_password(password, db_user.hashed_password):
        raise unauthed_exc

    if not db_user.is_active:
        raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User is not active"
            )

    return UserSchema(
        username=db_user.username,
        hashed_password=db_user.hashed_password,
        is_active=db_user.is_active,
    )


def get_current_token_payload(
    token: str = Depends(oauth2_scheme),
) -> dict:
    try:
        payload = jwt_utils.decode_jwt(
            token=token,
        )
    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token error",
        )
    return payload


async def get_current_auth_user(
    payload: dict = Depends(get_current_token_payload),
    db: AsyncSession = Depends(get_async_session)
) -> UserSchema:
    username: str = payload.get("sub")
    user = await get_user_by_username(db, username)
    if user:
        return UserSchema(
            username=user.username,
            hashed_password=user.hashed_password,
            is_active=user.is_active,
        )
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token invalid",
    )


def get_current_active_user(
        user: UserSchema = Depends(get_current_auth_user)
) -> UserSchema:
    if user.is_active:
        return user
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Inactive user",
    )


async def check_user_is_exist(
        username: str,
        db: AsyncSession = Depends(get_async_session),
) -> bool:
    if not await get_user_by_username(db, username):
        return False
    return True


async def get_user_by_username(db: AsyncSession, username: str) -> User:
    result = await db.execute(select(User).filter(User.username == username))
    return result.scalars().first()


async def create_user(db: AsyncSession, user: UserCreate) -> User:
    hashed_password = hash_password(user.password)
    db_user = User(
        username=user.username,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

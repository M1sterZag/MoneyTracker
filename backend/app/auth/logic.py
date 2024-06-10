from fastapi import Form, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from jwt import InvalidTokenError
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.work_with_db import get_user_by_username, get_user_by_id
from app.utils import jwt_utils
from app.db.database import get_async_session
from app.schemas.users import UserRead, UserLogin
from app.utils.password_utils import validate_password

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/login/",
)


async def validate_auth_user(
        user: UserLogin,
        db: AsyncSession
) -> UserRead:
    unauthed_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid username or password",
    )
    db_user = await get_user_by_username(db, user.username)
    if not db_user or not validate_password(user.hashed_password, db_user.hashed_password):
        raise unauthed_exc

    if not db_user.is_active:
        raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User is not active"
            )

    return UserRead(
        id=db_user.id,
        username=db_user.username,
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
) -> UserRead:
    user_id: int = payload.get("sub")
    user = await get_user_by_id(db, user_id)
    if user:
        return UserRead(
            id=user.id,
            username=user.username,
            is_active=user.is_active,
        )
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token invalid",
    )


def get_current_active_user(
        user: UserRead = Depends(get_current_auth_user)
) -> UserRead:
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

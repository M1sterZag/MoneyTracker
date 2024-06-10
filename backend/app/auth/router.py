from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.work_with_db import get_user_by_username, create_user
from app.utils import jwt_utils
from app.auth.logic import validate_auth_user, get_current_active_user
from app.db.database import get_async_session
from app.schemas.tokens import TokenSchema
from app.schemas.users import UserCreate, UserRead, UserLogin
from app.utils.jwt_utils import encode_jwt

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


@router.post("/signup", response_model=TokenSchema)
async def signup_user(
        user_signup: UserCreate,
        db: AsyncSession = Depends(get_async_session),
) -> TokenSchema:
    db_user = await get_user_by_username(db, user_signup.username)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists",
        )
    user = await create_user(db, user_signup)

    jwt_payload = {
        "sub": user.id,
        "username": user.username,
    }
    token = jwt_utils.encode_jwt(jwt_payload)
    return TokenSchema(
        access_token=token,
        token_type="bearer",
    )


@router.post("/login", response_model=TokenSchema)
async def login_user(
        user: UserLogin,
        db: AsyncSession = Depends(get_async_session)
) -> TokenSchema:
    user_data = await validate_auth_user(user, db)
    jwt_payload = {
        "sub": user_data.id,
        "username": user_data.username,
    }
    token = encode_jwt(jwt_payload)
    return TokenSchema(
        access_token=token,
        token_type="bearer",
    )


@router.get("/me", response_model=UserRead)
def get_me(user: UserRead = Depends(get_current_active_user)) -> UserRead:
    return user


from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import jwt_utils
from app.auth.logic import validate_auth_user, get_current_active_user, check_user_is_exist, create_user, \
    get_user_by_username
from app.db.database import get_async_session
from app.schemas.tokens import TokenSchema
from app.schemas.users import UserSchema, UserCreate, UserRead

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


@router.post("/signup", response_model=TokenSchema)
async def signup_user(
        user_signup: UserCreate,
        db: AsyncSession = Depends(get_async_session),
):
    db_user = await get_user_by_username(db, user_signup.username)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists",
        )
    user = await create_user(db, user_signup)

    jwt_payload = {
        "sub": user.username,
        "username": user.username,
    }
    token = jwt_utils.encode_jwt(jwt_payload)
    return TokenSchema(
        access_token=token,
        token_type="bearer",
    )


@router.post("/login", response_model=TokenSchema)
def login_user(
        user: UserSchema = Depends(validate_auth_user),
):
    jwt_payload = {
        "sub": user.username,
        "username": user.username,
    }
    token = jwt_utils.encode_jwt(jwt_payload)
    return TokenSchema(
        access_token=token,
        token_type="bearer",
    )


@router.get("/me", response_model=UserRead)
def get_me(user: UserSchema = Depends(get_current_active_user)):
    return UserRead(
        username=user.username,
        is_active=user.is_active,
    )


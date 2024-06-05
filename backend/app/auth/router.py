from fastapi import APIRouter, Depends, HTTPException, status

from app.auth import jwt_utils
from app.auth.logic import validate_auth_user, get_current_active_user
from app.schemas.tokens import TokenSchema
from app.schemas.users import UserSchema


router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


@router.post("/signup", response_model=TokenSchema)
def signup_user(
        user_signup: UserSchema
):
    for user in user_list:
        if user.username == user_signup.username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already exist",
                )
    user_list.append(user_signup)
    jwt_payload = {
        "sub": user_signup.username,
        "username": user_signup.username,
    }
    token = jwt_utils.encode_jwt(jwt_payload)
    return TokenSchema(
        token=token,
        token_type="bearer",
    )



@router.post("/login", response_model=TokenSchema)
def login_user(
        user: UserSchema = Depends(validate_auth_user)
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


@router.get("/me", response_model=UserSchema)
def get_me(user: UserSchema = Depends(get_current_active_user)):
    return {
        "username": user.username,
    }


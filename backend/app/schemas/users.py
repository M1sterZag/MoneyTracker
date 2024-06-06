from pydantic import BaseModel, Field


class UserSchema(BaseModel):
    username: str


class UserRead(UserSchema):
    id: int
    is_active: bool


class UserLogin(UserSchema):
    hashed_password: str = Field(alias='password')


class UserCreate(UserSchema):
    hashed_password: str = Field(alias="password")
    is_active: bool = True

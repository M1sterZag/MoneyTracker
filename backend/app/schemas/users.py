from pydantic import BaseModel, Field


class UserSchema(BaseModel):
    username: str
    hashed_password: str
    is_active: bool = True


class UserRead(BaseModel):
    username: str
    is_active: bool


class UserCreate(BaseModel):
    username: str
    password: str = Field(alias="password")
    is_active: bool = True

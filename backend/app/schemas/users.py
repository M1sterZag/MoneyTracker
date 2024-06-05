from pydantic import BaseModel, Field


class UserSchema(BaseModel):
    username: str
    password: bytes
    is_active: bool = True


class UserRead(BaseModel):
    id: int
    username: str


class UserCreate(BaseModel):
    username: str
    password: bytes = Field(alias="password")
    is_active: bool = True

from pydantic import BaseModel


class User(BaseModel):
    username: str
    is_active: bool


class UserRead(User):
    id: int


class UserCreate(User):
    password: bytes

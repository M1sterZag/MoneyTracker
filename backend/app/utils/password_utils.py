import base64

import bcrypt


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode(), salt)
    return base64.b64encode(hashed).decode()


def validate_password(password: str, hashed_password: str) -> bool:
    hashed_password_bytes = base64.b64decode(hashed_password.encode())
    return bcrypt.checkpw(password.encode(), hashed_password_bytes)
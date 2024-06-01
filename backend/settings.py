from pathlib import Path
from pydantic import BaseModel
from dotenv import load_dotenv
import os

BASE_DIR = Path(__file__).parent

load_dotenv()


class DbSettings(BaseModel):
    DB_HOST: str = os.environ.get("DB_HOST")
    DB_PORT: str = os.environ.get("DB_PORT")
    DB_USER: str = os.environ.get("DB_USER")
    DB_NAME: str = os.environ.get("DB_NAME")
    DB_PASS: str = os.environ.get("DB_PASS")


class AuthJWT(BaseModel):
    private_key_path: Path = BASE_DIR / "certs" / "jwt-private.pem"
    public_key_path: Path = BASE_DIR / "certs" / "jwt-public.pem"
    algorithm: str = "RS256"
    access_token_expire_minutes: int = 15


class Settings:
    db: DbSettings = DbSettings()

    auth_jwt: AuthJWT = AuthJWT()


settings = Settings()

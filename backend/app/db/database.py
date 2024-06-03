from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from backend.settings import settings


DATABASE_URL = (f"postgresql+asyncpg://{settings.db.DB_USER}:{settings.db.DB_PASS}@"
                f"{settings.db.DB_HOST}:{settings.db.DB_PORT}/{settings.db.DB_NAME}")

engine = create_async_engine(DATABASE_URL)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def get_async_session():
    async with async_session_maker() as session:
        yield session

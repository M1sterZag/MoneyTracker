from fastapi import APIRouter
from .users import router as users_router
from app.auth.router import router as auth_router

router = APIRouter(
    prefix="/api",
    tags=["All routes"],
)

# router.include_router(users_router)
router.include_router(auth_router)

from fastapi import APIRouter
from app.auth.router import router as auth_router
from app.operations_service.router import router as operations_router

router = APIRouter(
    prefix="/api",
    tags=["All routes"],
)

router.include_router(auth_router)
router.include_router(operations_router)

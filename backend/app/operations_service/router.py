from typing import List

from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.logic import get_current_active_user
from app.db.database import get_async_session
from app.operations_service.work_with_db import create_operation, get_operations_by_user, delete_operation
from app.schemas.operations import OperationRead, OperationCreate
from app.schemas.users import UserRead

router = APIRouter(
    prefix="/operations",
    tags=["Operations"],
)


@router.post("/", response_model=OperationRead)
async def add_operation(
        operation: OperationCreate,
        db: AsyncSession = Depends(get_async_session),
        current_user: UserRead = Depends(get_current_active_user)
):
    operation = await create_operation(db, current_user.id, operation)
    return operation


@router.get("/", response_model=List[OperationRead])
async def get_user_operations(
    current_user: UserRead = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    return await get_operations_by_user(db, current_user.id)


@router.delete("/{operation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_operation(
    operation_id: int,
    current_user: UserRead = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    success = await delete_operation(db, current_user.id, operation_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Operation not found"
        )

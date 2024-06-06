from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import Operation
from app.schemas.operations import OperationCreate


async def create_operation(
        db: AsyncSession,
        user_id: int,
        operation: OperationCreate
) -> Operation:
    db_operation = Operation(**operation.dict(), user_id=user_id)
    db.add(db_operation)
    await db.commit()
    await db.refresh(db_operation)
    return db_operation


async def get_operations_by_user(db: AsyncSession, user_id: int):
    result = await db.execute(select(Operation).filter(Operation.user_id == user_id))
    return result.scalars().all()


async def delete_operation(db: AsyncSession, user_id: int, operation_id: int) -> bool:
    result = await db.execute(select(Operation).filter(Operation.id == operation_id, Operation.user_id == user_id))
    operation = result.scalars().first()
    if operation:
        await db.delete(operation)
        await db.commit()
        return True
    return False

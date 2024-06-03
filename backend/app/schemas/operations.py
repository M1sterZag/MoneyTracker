from datetime import datetime
from enum import Enum

from pydantic import BaseModel


class OperationType(str, Enum):
    INCOME = "income"
    EXPENSE = "expense"


class Operation(BaseModel):
    title: str
    amount: float
    type: OperationType
    date: datetime


class OperationRead(Operation):
    id: int
    user_id: int


class OperationCreate(Operation):
    user_id: int

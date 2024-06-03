import enum

from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship

from app.db.models.base import Base
from app.db.models.users import User


class OperationType(enum.Enum):
    income = "income"
    expense = "expense"


class Operation(Base):
    __tablename__ = "operations"
    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    amount = Column(Float, nullable=False)
    type = Column(SQLEnum(OperationType), nullable=False)
    date = Column(Date, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user = relationship(User)

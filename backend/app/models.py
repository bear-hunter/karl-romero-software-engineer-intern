"""
Database models for storing Ethereum account data.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Numeric, DateTime

from .database import Base


class Account(Base):
    """
    Model for storing Ethereum account balances.
    
    Attributes:
        id: Primary key
        address: Ethereum wallet address (42 characters, starts with 0x)
        balance: Account balance in Wei (stored as string for precision)
        last_updated: Timestamp of when the balance was last fetched
    """
    __tablename__ = "accounts"
    
    id = Column(Integer, primary_key=True, index=True)
    address = Column(String(42), unique=True, index=True, nullable=False)
    balance = Column(String(78), nullable=False)  # Wei can be up to 78 digits
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f"<Account(address={self.address}, balance={self.balance})>"

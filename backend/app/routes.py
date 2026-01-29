"""
API routes for Ethereum data endpoints.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from .database import get_db
from .models import Account
from .services import (
    get_gas_price,
    get_block_number,
    get_balance,
    validate_ethereum_address,
    wei_to_eth,
    wei_to_gwei
)

router = APIRouter(prefix="/api", tags=["ethereum"])


@router.get("/account/{address}")
async def get_account_info(address: str, db: Session = Depends(get_db)):
    """
    Get Ethereum account information including gas price, block number, and balance.
    
    Args:
        address: Ethereum wallet address (must be 42 characters, start with 0x)
        
    Returns:
        JSON with gas_price, block_number, balance (in Wei and ETH)
    """
    # Validate address format
    if not validate_ethereum_address(address):
        raise HTTPException(
            status_code=400,
            detail="Invalid Ethereum address. Must be 42 characters and start with 0x"
        )
    
    # Get gas price (cached)
    gas_price_wei = await get_gas_price()
    if gas_price_wei is None:
        raise HTTPException(status_code=500, detail="Failed to fetch gas price")
    
    # Get block number (cached)
    block_number = await get_block_number()
    if block_number is None:
        raise HTTPException(status_code=500, detail="Failed to fetch block number")
    
    # Get balance for address
    balance_wei = await get_balance(address)
    if balance_wei is None:
        raise HTTPException(status_code=500, detail="Failed to fetch balance")
    
    # Store/update balance in database
    address_lower = address.lower()
    account = db.query(Account).filter(Account.address == address_lower).first()
    
    if account:
        account.balance = balance_wei
        account.last_updated = datetime.utcnow()
    else:
        account = Account(address=address_lower, balance=balance_wei)
        db.add(account)
    
    db.commit()
    
    # Return response
    return {
        "address": address,
        "gas_price": {
            "wei": gas_price_wei,
            "gwei": wei_to_gwei(gas_price_wei)
        },
        "block_number": block_number,
        "balance": {
            "wei": balance_wei,
            "eth": wei_to_eth(balance_wei)
        }
    }


@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

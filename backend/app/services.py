"""
Blockchain services for interacting with Ethereum network via Alchemy and Etherscan.
"""

import httpx
from typing import Optional
from web3 import Web3

from .config import settings
from .cache import get_cached, set_cached

# Initialize Web3 with Alchemy provider
w3 = Web3(Web3.HTTPProvider(settings.ALCHEMY_URL))


async def get_gas_price() -> Optional[str]:
    """
    Get current gas price from Ethereum network.
    Checks cache first, then queries Alchemy if not cached.
    
    Returns:
        Gas price in Wei as string, or None if error
    """
    cache_key = "gas_price"
    
    # Check cache first
    cached_value = get_cached(cache_key)
    if cached_value is not None:
        return cached_value
    
    try:
        # Query Alchemy for gas price
        gas_price = w3.eth.gas_price
        gas_price_str = str(gas_price)
        
        # Cache the result
        set_cached(cache_key, gas_price_str)
        
        return gas_price_str
    except Exception as e:
        print(f"Error getting gas price: {e}")
        return None


async def get_block_number() -> Optional[int]:
    """
    Get current block number from Ethereum network.
    Checks cache first, then queries Alchemy if not cached.
    
    Returns:
        Current block number, or None if error
    """
    cache_key = "block_number"
    
    # Check cache first
    cached_value = get_cached(cache_key)
    if cached_value is not None:
        return int(cached_value)
    
    try:
        # Query Alchemy for block number
        block_number = w3.eth.block_number
        
        # Cache the result
        set_cached(cache_key, str(block_number))
        
        return block_number
    except Exception as e:
        print(f"Error getting block number: {e}")
        return None


async def get_balance(address: str) -> Optional[str]:
    """
    Get balance for an Ethereum address.
    
    Args:
        address: Ethereum wallet address (42 characters, starts with 0x)
        
    Returns:
        Balance in Wei as string, or None if error
    """
    try:
        # Convert to checksum address
        checksum_address = Web3.to_checksum_address(address)
        
        # Query Alchemy for balance
        balance = w3.eth.get_balance(checksum_address)
        
        return str(balance)
    except Exception as e:
        print(f"Error getting balance for {address}: {e}")
        return None


async def get_transactions(address: str, limit: int = 10) -> Optional[list]:
    """
    Get transaction history for an Ethereum address from Etherscan.
    
    Args:
        address: Ethereum wallet address
        limit: Number of transactions to retrieve (default 10)
        
    Returns:
        List of transactions, or None if error
    """
    try:
        url = "https://api.etherscan.io/api"
        params = {
            "module": "account",
            "action": "txlist",
            "address": address,
            "startblock": 0,
            "endblock": 99999999,
            "page": 1,
            "offset": limit,
            "sort": "desc",
            "apikey": settings.ETHERSCAN_API_KEY
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            data = response.json()
            
            if data.get("status") == "1":
                return data.get("result", [])
            else:
                print(f"Etherscan API error: {data.get('message')}")
                return []
                
    except Exception as e:
        print(f"Error getting transactions for {address}: {e}")
        return None


def validate_ethereum_address(address: str) -> bool:
    """
    Validate Ethereum address format.
    
    Args:
        address: Address to validate
        
    Returns:
        True if valid, False otherwise
    """
    if not address:
        return False
    if len(address) != 42:
        return False
    if not address.startswith("0x"):
        return False
    
    # Check if remaining characters are valid hex
    try:
        int(address[2:], 16)
        return True
    except ValueError:
        return False


def wei_to_eth(wei: str) -> str:
    """
    Convert Wei to ETH.
    
    Args:
        wei: Amount in Wei as string
        
    Returns:
        Amount in ETH as formatted string
    """
    try:
        eth = Web3.from_wei(int(wei), "ether")
        return str(eth)
    except Exception:
        return "0"


def wei_to_gwei(wei: str) -> str:
    """
    Convert Wei to Gwei (for gas price display).
    
    Args:
        wei: Amount in Wei as string
        
    Returns:
        Amount in Gwei as formatted string
    """
    try:
        gwei = Web3.from_wei(int(wei), "gwei")
        return str(gwei)
    except Exception:
        return "0"

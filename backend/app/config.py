"""
Configuration module for loading environment variables.
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Settings:
    """Application settings loaded from environment variables."""
    
    # Alchemy Configuration
    ALCHEMY_API_KEY: str = os.getenv("ALCHEMY_API_KEY", "")
    ALCHEMY_URL: str = os.getenv("ALCHEMY_URL", "")
    
    # Etherscan Configuration
    ETHERSCAN_API_KEY: str = os.getenv("ETHERSCAN_API_KEY", "")
    
    # Database Configuration
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://localhost/ethereum_tracker")
    
    # Redis Configuration
    REDIS_HOST: str = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT: int = int(os.getenv("REDIS_PORT", "6379"))
    CACHE_EXPIRY: int = int(os.getenv("CACHE_EXPIRY", "300"))  # 5 minutes default


# Create a global settings instance
settings = Settings()

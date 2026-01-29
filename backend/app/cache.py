"""
Redis caching module for storing gas price and block number.
"""

import redis
from typing import Optional

from .config import settings

# Create Redis client
redis_client: Optional[redis.Redis] = None


def get_redis_client() -> redis.Redis:
    """
    Get or create Redis client connection.
    Returns the Redis client instance.
    """
    global redis_client
    if redis_client is None:
        redis_client = redis.Redis(
            host=settings.REDIS_HOST,
            port=settings.REDIS_PORT,
            decode_responses=True
        )
    return redis_client


def get_cached(key: str) -> Optional[str]:
    """
    Get a value from Redis cache.
    
    Args:
        key: The cache key to retrieve
        
    Returns:
        The cached value if it exists, None otherwise
    """
    try:
        client = get_redis_client()
        return client.get(key)
    except redis.RedisError as e:
        print(f"Redis get error: {e}")
        return None


def set_cached(key: str, value: str, expiry: Optional[int] = None) -> bool:
    """
    Set a value in Redis cache with optional expiry.
    
    Args:
        key: The cache key
        value: The value to cache
        expiry: Time-to-live in seconds (defaults to CACHE_EXPIRY from settings)
        
    Returns:
        True if successful, False otherwise
    """
    try:
        client = get_redis_client()
        ttl = expiry if expiry is not None else settings.CACHE_EXPIRY
        client.setex(key, ttl, value)
        return True
    except redis.RedisError as e:
        print(f"Redis set error: {e}")
        return False


def close_redis():
    """Close the Redis connection."""
    global redis_client
    if redis_client is not None:
        redis_client.close()
        redis_client = None

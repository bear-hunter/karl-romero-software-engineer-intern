"""
Main FastAPI application entry point.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import init_db
from .cache import close_redis
from .routes import router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.
    Handles startup and shutdown events.
    """
    # Startup: Initialize database tables
    print("Starting up...")
    init_db()
    print("Database initialized")
    
    yield
    
    # Shutdown: Close connections
    print("Shutting down...")
    close_redis()
    print("Redis connection closed")


# Create FastAPI application
app = FastAPI(
    title="Ethereum Tracker API",
    description="API for tracking Ethereum account balances, gas prices, and block numbers",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS to allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js development server
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router)


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "name": "Ethereum Tracker API",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "account": "/api/account/{address}",
            "health": "/api/health"
        }
    }

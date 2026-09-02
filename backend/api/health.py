"""
Production-ready Health & Readiness check endpoints for Nodoos AI Backend.
Supports /health, /api/health, and /healthz for GET and HEAD requests.
"""
import logging
from datetime import datetime, timezone
from fastapi import APIRouter, Response, status
from fastapi.responses import JSONResponse
from sqlalchemy import text

from db.session import get_active_engine
from app.config import settings

logger = logging.getLogger(__name__)

router = APIRouter(tags=["health"])


async def check_database_health():
    """Performs a live ping query against the active database engine."""
    try:
        engine = await get_active_engine()
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        
        # Determine engine type (PostgreSQL vs SQLite fallback)
        engine_name = engine.dialect.name if hasattr(engine, "dialect") else "unknown"
        return True, engine_name, None
    except Exception as e:
        logger.error(f"Health check DB ping failed: {e}")
        return False, "unknown", str(e)


@router.get("/health", status_code=status.HTTP_200_OK)
@router.head("/health", status_code=status.HTTP_200_OK)
@router.get("/api/health", status_code=status.HTTP_200_OK)
@router.head("/api/health", status_code=status.HTTP_200_OK)
@router.get("/healthz", status_code=status.HTTP_200_OK)
@router.head("/healthz", status_code=status.HTTP_200_OK)
async def health_check():
    """
    Health check endpoint for production monitoring, load balancers, 
    and container orchestrators (Render, Kubernetes, AWS ALB, Vercel).
    """
    db_healthy, db_engine, db_error = await check_database_health()
    
    timestamp = datetime.now(timezone.utc).isoformat()
    environment = "development" if settings.FRONTEND_URL.startswith("http://localhost") else "production"

    payload = {
        "status": "ok" if db_healthy else "degraded",
        "timestamp": timestamp,
        "service": "Nodoos AI Backend API",
        "version": "3.0",
        "environment": environment,
        "database": {
            "status": "connected" if db_healthy else "disconnected",
            "engine": db_engine,
        }
    }

    if not db_healthy:
        payload["database"]["error"] = db_error
        # Return 503 Service Unavailable if critical component (DB) fails
        return JSONResponse(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, content=payload)

    return payload

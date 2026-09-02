"""
Tests for the health check routes (/health, /api/health, /healthz).
"""
import pytest
from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)


def test_health_routes():
    endpoints = ["/health", "/api/health", "/healthz"]
    for path in endpoints:
        response = client.get(path)
        assert response.status_code in (200, 503)
        data = response.json()
        assert "status" in data
        assert "service" in data
        assert data["service"] == "Nodoos AI Backend API"
        assert "version" in data
        assert "timestamp" in data
        assert "database" in data


def test_health_head_requests():
    endpoints = ["/health", "/api/health", "/healthz"]
    for path in endpoints:
        response = client.head(path)
        assert response.status_code in (200, 503)

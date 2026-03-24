"""
Python Test File
Tests syntax highlighting for Python tokens
"""

from __future__ import annotations

import asyncio
import json
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum, auto
from pathlib import Path
from typing import (
    Any,
    Callable,
    Dict,
    Generic,
    List,
    Optional,
    Protocol,
    TypeVar,
    Union,
)

# Constants
API_URL: str = "https://api.example.com"
MAX_RETRIES: int = 3
TIMEOUT: float = 30.0

# Enum
class Status(Enum):
    PENDING = auto()
    ACTIVE = auto()
    COMPLETED = auto()
    FAILED = auto()


# Protocol (structural subtyping)
class Serializable(Protocol):
    def to_dict(self) -> Dict[str, Any]: ...
    def to_json(self) -> str: ...


# Dataclass
@dataclass
class User:
    id: int
    name: str
    email: str
    status: Status = Status.PENDING
    created_at: datetime = field(default_factory=datetime.now)
    metadata: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "status": self.status.name,
            "created_at": self.created_at.isoformat(),
        }

    def to_json(self) -> str:
        return json.dumps(self.to_dict())


# Generic type variable
T = TypeVar("T", bound="BaseModel")


# Abstract base class
class BaseModel(ABC):
    @abstractmethod
    def validate(self) -> bool:
        """Validate the model."""
        pass

    @classmethod
    def from_dict(cls: type[T], data: Dict[str, Any]) -> T:
        return cls(**data)


# Decorator
def retry(max_attempts: int = 3, delay: float = 1.0):
    """Retry decorator with exponential backoff."""
    def decorator(func: Callable) -> Callable:
        async def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(max_attempts):
                try:
                    return await func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    wait_time = delay * (2 ** attempt)
                    await asyncio.sleep(wait_time)
            raise last_exception
        return wrapper
    return decorator


# Context manager
class DatabaseConnection:
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        self._connection = None

    async def __aenter__(self):
        self._connection = await self._connect()
        return self._connection

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self._connection:
            await self._connection.close()
        return False

    async def _connect(self):
        # Simulated connection
        return {"connected": True}


# Async generator
async def fetch_pages(url: str, max_pages: int = 10):
    """Async generator for paginated API responses."""
    page = 1
    while page <= max_pages:
        response = await fetch_page(url, page)
        if not response["data"]:
            break
        yield response["data"]
        page += 1


# List comprehension and generators
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squares = [x ** 2 for x in numbers]
evens = [x for x in numbers if x % 2 == 0]
matrix = [[i * j for j in range(5)] for i in range(5)]

# Dictionary comprehension
word_lengths = {word: len(word) for word in ["hello", "world", "python"]}

# Set comprehension
unique_chars = {char.lower() for char in "Hello World" if char.isalpha()}

# Generator expression
sum_of_squares = sum(x ** 2 for x in range(100))

# Pattern matching (Python 3.10+)
def handle_response(response: Dict[str, Any]) -> str:
    match response:
        case {"status": "success", "data": data}:
            return f"Success: {data}"
        case {"status": "error", "message": msg}:
            return f"Error: {msg}"
        case {"status": status}:
            return f"Unknown status: {status}"
        case _:
            return "Invalid response"


# Main entry point
async def main():
    user = User(id=1, name="John Doe", email="john@example.com")
    print(f"User: {user.name} ({user.email})")
    print(f"JSON: {user.to_json()}")


if __name__ == "__main__":
    asyncio.run(main())

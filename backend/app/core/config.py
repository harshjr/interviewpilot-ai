from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    app_name: str = "InterviewPilot AI"
    app_version: str = "0.1.0"
    app_env: str = "development"
    frontend_url: str = "http://localhost:3000"
    debug: bool = True

    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache()
def get_settings() -> Settings:
    return Settings()

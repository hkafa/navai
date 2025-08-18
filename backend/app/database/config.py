from pydantic_settings import BaseSettings

class Environment(BaseSettings):
    database_url: str = "postgresql://user:password@db:5432/adventure_db"
    secret_key: str = "your-secret-key-here"
    debug: bool = True

env = Environment()
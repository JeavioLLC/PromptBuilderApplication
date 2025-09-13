"""
Database configuration for PostgreSQL
"""
import os
from urllib.parse import quote_plus

class DatabaseConfig:
    """Database configuration class"""
    
    # PostgreSQL configuration
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_PORT = os.getenv('DB_PORT', '5432')
    DB_NAME = os.getenv('DB_NAME', 'prompt_builder')
    DB_USER = os.getenv('DB_USER', 'postgres')
    DB_PASSWORD = os.getenv('DB_PASSWORD', 'password')
    
    # Construct PostgreSQL connection string
    @classmethod
    def get_database_uri(cls):
        """Get the PostgreSQL database URI"""
        # URL encode the password to handle special characters
        encoded_password = quote_plus(cls.DB_PASSWORD)
        
        return f"postgresql://{cls.DB_USER}:{encoded_password}@{cls.DB_HOST}:{cls.DB_PORT}/{cls.DB_NAME}"
    
    # Alternative connection string format
    @classmethod
    def get_database_uri_alternative(cls):
        """Alternative PostgreSQL connection string format"""
        return f"postgresql+psycopg2://{cls.DB_USER}:{cls.DB_PASSWORD}@{cls.DB_HOST}:{cls.DB_PORT}/{cls.DB_NAME}"

class DevelopmentConfig(DatabaseConfig):
    """Development configuration"""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = DatabaseConfig.get_database_uri()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')

class ProductionConfig(DatabaseConfig):
    """Production configuration"""
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = DatabaseConfig.get_database_uri()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'production-secret-key-change-this')

class TestingConfig(DatabaseConfig):
    """Testing configuration"""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'test-secret-key'

# Configuration mapping
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}

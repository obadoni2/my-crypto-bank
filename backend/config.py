from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_mail import Mail
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os
import redis

# Load environment variables from .env file
load_dotenv()

db = SQLAlchemy()
ma = Marshmallow()
mail = Mail()
bcrypt = Bcrypt()

basedir = os.path.abspath(os.path.dirname(__file__))

class ApplicationConfig:
    # Retrieve environment variables with a default fallback for optional keys
    SECRET_KEY = os.environ.get("SECRET_KEY", "default_secret_key")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "default_jwt_secret_key")

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(
        basedir, "CryptoDB.db"
    )

    SESSION_COOKIE_SECURE = True
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url(os.environ.get("REDIS_URL", "redis://localhost:6379"))
    

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME", "default_obadoniemma@gmail.com")
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD", "default_Emma11111.")
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True


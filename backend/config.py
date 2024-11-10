from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_mail import Mail
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os
import redis


load_dotenv()
db = SQLAlchemy()
ma = Marshmallow()
mail = Mail()
bcrypt = Bcrypt()

basedir = os.path.abspath(os.path.dirname(__file__))


class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]
    JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(
        basedir, "CryptoDB.db"
    )

    SESSION_COOKIE_SECURE = True
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://localhost:6379")
    SESSION_COOKIE_SECURE = True

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    #MAIL_USERNAME = 'sbesmail123@gmail.com'
    MAIL_USERNAME = 'mailzaaplikaciju21@gmail.com'
    MAIL_PASSWORD = "jabxcsxssvjkjuiu"
    #Pasword za logovanje na taj mail 'mailzaaplikaciju21'
    #MAIL_PASSWORD = 'Sifra567!'
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True

from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow 
from flask_mail import import Mail 
from flask_bcrypt import Bcrypt 
from dotenv import load_dotenv
import os 
import redis 

load_dotenv()
db = SQLAlchemy()
ma = Marshmallow()
mail = mail()
bcrypt = Bcrypt()


basedir = os.path.abspath(os.path.dirname(__file__))


class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]
    JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO =  True 
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
    
    #MAIL_USERNAMEC = 'obadoniemma@gmail.com'
    MAIL_USERNAME = 'obadoniemma@gmail.com'
    MAIL_PASSWORD = "Emma11111."
    
    #Password za logovanja na taj mail 
    #MAIL_PASSWORD = 'sifra587!
    
    MAIL_USE_TLS = False 
    MAIL_USE_SSL = True 
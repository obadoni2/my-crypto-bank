from flask import Blueprint 
from sqlalchemy import false
from model.user import User
from flask import jsonify, request, session, Response
from model.payment_card import PaymentCard
from model.crypto_account import CrytoAccount
from model.crypto_account import CryptoAccount
from datetime import datetime, timedelta 
import random 
from config import db, bcrypt 
from model.user import UserSchema
from modules.modules import send_mail 
from flask_jwt_extended import (
    jwt_required, create_access_token,
    get_jwt_identity, get_jwt, verify_jwt_in_request
)
from modules.authorization import admin_required

auth = Blueprint("auth", __name__)

@auth.route("/validateOTP", methods=["PATCH"])
def verification_with_otp():
    user_otp = request.json["otp"]
    email = request.json["email"]
    user = User.query.filter_by(email=email).first()
    
    
    if user_otp == user.otp:
        user.otp = "0" # mark de validiran
        db.session.commit()
        access_token = create_access_token(identity={"id":user.id, "role": user.role}, expires_delta=timedelta(minutes=30))
        return {"token": access_token, "verified":"true", "role":user.role}
    else:
        return {"verified": "false"}
    
@auth.route("/registerUser", methods=["POST"])
def register_user():
    name, lname, address, password, email, phone, country,city
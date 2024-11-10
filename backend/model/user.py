from email.policy import default
from .crypto_account import CryptoAccountSchema
from .payment_card import PaymentCardSchema
from .transaction import TransactionSchema
from config import db, ma
from marshmallow import Schema, fields


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(32))
    last_name = db.Column(db.String(32))
    address = db.Column(db.String(50))
    password = db.Column(db.String(50))
    email = db.Column(db.String(50))
    phone = db.Column(db.String(50))
    country = db.Column(db.String(50))
    city = db.Column(db.String(50))
    role = db.Column(db.String(50))
    is_blocked = db.Column(db.Boolean())
    otp = db.Column(db.String(7), default=" ")
    crypto_account = db.relationship(
        "CryptoAccount", backref="user", uselist=False
    )  # one to one
    payment_card = db.relationship("PaymentCard", backref="user", uselist=False)
    transactions = db.relationship("Transaction", backref="user")

    def __init__(
        self, first_name, last_name, address, password, email, phone, country, city, role, is_blocked
    ):
        self.first_name = first_name
        self.last_name = last_name
        self.address = address
        self.password = password
        self.email = email
        self.phone = phone
        self.country = country
        self.city = city
        self.role = role
        self.is_blocked = is_blocked


class UserSchema(ma.Schema):
    id = fields.Number()
    first_name = fields.Str()
    last_name = fields.Str()
    address = fields.Str()
    password = fields.Str()
    email = fields.Str()
    phone = fields.Str()
    country = fields.Str()
    city = fields.Str()
    role = fields.Str()
    is_blocked = fields.Bool()
    otp = fields.Str()
    crypto_account = fields.Nested(CryptoAccountSchema)
    payment_card = fields.Nested(PaymentCardSchema)
    transactions = fields.List(fields.Nested(TransactionSchema))

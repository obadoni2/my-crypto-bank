from config import db, ma
from marshmallow import Schema, fields
from enum import Enum
from .transaction_state import TransactionState


class Transaction(db.Model):
    __tablename__ = "transaction"
    hashID = db.Column(db.String(256), primary_key=True)
    sender = db.Column(db.String(50))
    recipient = db.Column(db.String(50))
    state = db.Column(db.String(10))
    amount = db.Column(db.Integer)
    cryptocurrency = db.Column(db.String(10))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    # crypto_currency = db.relationship("CryptoCurrency", backref="crypto_currency", uselist=False)
    #stavi ga kao string


class TransactionSchema(ma.Schema):
    hashID = fields.Str()
    sender = fields.Str()
    recipient = fields.Str()
    state = fields.Str()
    amount = fields.Number()
    cryptocurrency = fields.Str()

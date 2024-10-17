from sqlalchemy.orm import backref
from config import db, ma 
from marshmallow import Schema, fields
from .crypto_currency import CryptoCurrencySchema

class CryptoAccount(db.Model):
    # __tablename__ = "crypto_account"
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer)
    crypto_currencies = db.relationship(
        "CryptoCurrency", backref="account"
    ) # one to many
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    
class CryptoAccountSchema(ma.Schema):
    id = fields.Number()
    amount = fields.Number()
    crypto_currencies = fields.List(fields.Nested(CryptoCurrencySchema))
    user_id = fields.Number()
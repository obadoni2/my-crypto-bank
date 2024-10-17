from config import db, ma 
from marshmallow import Schema, fields

class CryptoCurrency(db.Model):
    __tablename__ = "crypto_currency"
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(32))
    account_id = db.Column(db.Integer, db.ForeignKey("crypto_account.id"))
    
    

 # def _init_(
  #   self, amount , name , account_id
 # self.amount = amount
 # self.name = name 
 # self .account_id = accound_id
 
class CryptoCurrencySchema(ma.Schema):
    id = fields.Number()
    amount = fields.Number()
    name = fields.Str()
    account_id = fields.Number()
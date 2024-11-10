from flask import Blueprint, Response
from flask import request, session, jsonify
from model.user import User
from config import db
from model.crypto_currency import CryptoCurrencySchema
from model.crypto_account import CryptoAccount
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

account = Blueprint("account", __name__)


@account.route("/deposit", methods=["PATCH"])
@jwt_required()
def deposit():
    amount = request.json["amount"]
    user_id = get_jwt_identity()["id"]
    user = User.query.get(user_id)
    payment_card = user.payment_card
    crypto_account = user.crypto_account
    if(payment_card.money_amount - int(amount) < 0):
        return jsonify({"error": "You don't have enough money on payment card"})
    payment_card.money_amount -= int(amount)
    crypto_account.amount += int(amount)
    db.session.commit()
    return Response(status=200)

@account.route("/getCrypto")  # pregled stanja
@jwt_required()
def get_crypto():
    user_id = get_jwt_identity()["id"]
    crypto_account = CryptoAccount.query.filter_by(user_id=user_id).first()
    all_crypto_currencies = crypto_account.crypto_currencies
    schema = CryptoCurrencySchema(many=True)
    results = schema.dump(all_crypto_currencies)
    return jsonify(results)


@account.route("/getMoney")  # pregled stanja
@jwt_required()
def get_money():
    #user_id = session.get("user_id")
    user_id = get_jwt_identity()["id"]
    crypto_account = CryptoAccount.query.filter_by(user_id=user_id).first()

    return jsonify({"value": crypto_account.amount}), 200



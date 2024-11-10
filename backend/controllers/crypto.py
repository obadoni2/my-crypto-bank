from flask import Blueprint
from flask import request, session, Response
from model.user import User
import requests
import json
from config import db
from model.crypto_currency import CryptoCurrency
from modules.modules import update_crypto_currency
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

crypto = Blueprint("crypto", __name__)


@crypto.route("/showCrypto_all")
@jwt_required()
def showCrypto_all():
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
    headers = {"Accepts": "application/json",
               "X-CMC_PRO_API_KEY": "4ceb685b-2766-45cc-8127-147c64386639"}
    sess = requests.Session()
    sess.headers.update(headers)
    response = sess.get(url)
    json_response = response.json()
    crypto_value_list = []
    for crypto in json_response["data"]:
        name = str(crypto["name"])
        symbol = str(crypto["symbol"])
        value = crypto["quote"]["USD"]["price"]
        crypto_value_list.append(
            {"name": name, "symbol": symbol, "value": value})
    crypto_value_list = json.dumps(crypto_value_list)
    return crypto_value_list, 200


@crypto.route("/showCryptoSymbols")
@jwt_required()
def get_all_crypto_currencies():
    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map"
    parameters = {"sort": "cmc_rank"}
    headers = {"Accepts": "application/json",
               "X-CMC_PRO_API_KEY": "4ceb685b-2766-45cc-8127-147c64386639"}
    sess = requests.Session()
    sess.headers.update(headers)
    response = sess.get(url, params=parameters)
    json_response = response.json()
    crypto_list = []
    for i in range(len(json_response["data"])):
        crypto_list.append(str(json_response["data"][i]["symbol"]))
    crypto_list = json.dumps(crypto_list)
    return crypto_list


@crypto.route("/exchange", methods=["PATCH"])
@jwt_required()
def exchange():
    sell = request.json["currencySell"]
    buy = request.json["currencyBuy"]
    x = request.json["amountToBuy"]
    amount = int(x)

    price = get_price(buy, sell)
    user_id = get_jwt_identity()["id"]
    user = User.query.get(user_id)
    crypto_account = user.crypto_account
    sum_to_pay = price * amount

    if sell == "USD":
        if sum_to_pay > crypto_account.amount:
            return {"error": "You don't have enough money"}
        crypto_account.amount -= sum_to_pay
        crypto_currencies = crypto_account.crypto_currencies
        iterator = filter(lambda x: x.name == buy, crypto_currencies)
        crypto_currencies = list(iterator)
        if crypto_currencies == []:
            create_crypto_currency(buy, amount, crypto_account)
        else:
            update_crypto_currency(buy, amount, crypto_currencies)
    elif buy == "USD":
        crypto_currencies = crypto_account.crypto_currencies
        crypto_currency = next(
            filter(lambda x: x.name == sell, crypto_currencies), None)

        if crypto_currency == None:
            return {"error": "You don't have this currency"}

        if sum_to_pay > crypto_currency.amount:
            return {"error": "You don't have enough crypto currency"}
        crypto_currency.amount -= amount
        crypto_account.amount += sum_to_pay
        db.session.commit()

    else:
        crypto_currencies = crypto_account.crypto_currencies
        crypto_currency = next(
            filter(lambda x: x.name == sell, crypto_currencies), None)

        if crypto_currency == None:
            return {"error": "You don't have this currency"}

        if sum_to_pay > crypto_currency.amount:
            return {"error": "you don't have enough crypto currency"}, 400
        crypto_currency.amount -= sum_to_pay
        crypto_currencies = crypto_account.crypto_currencies
        iterator = filter(lambda x: x.name == buy, crypto_currencies)
        crypto_currencies = list(iterator)
        if crypto_currencies == []:
            create_crypto_currency(buy, amount, crypto_account)
        else:
            update_crypto_currency(buy, amount, crypto_currencies)

    return Response(status=200)

#region Functions


def get_price(buy, sell):
    if buy == "USD":
        url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
        parameters = {"symbol": sell, "convert": buy}
        headers = {"Accepts": "application/json",
                   "X-CMC_PRO_API_KEY": "4ceb685b-2766-45cc-8127-147c64386639"}
        sess = requests.Session()
        sess.headers.update(headers)
        response = sess.get(url, params=parameters)
        price = response.json()["data"][sell]["quote"][buy]["price"]
    else:  # jer u symbol ne mogu staviti USD, ocekuje crypto
        url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
        parameters = {"symbol": buy, "convert": sell}
        headers = {"Accepts": "application/json",
                   "X-CMC_PRO_API_KEY": "4ceb685b-2766-45cc-8127-147c64386639"}
        sess = requests.Session()
        sess.headers.update(headers)
        response = sess.get(url, params=parameters)
        price = response.json()["data"][buy]["quote"][sell]["price"]

    return price



def create_crypto_currency(name, amount, crypto_account):
    crypto_currency = CryptoCurrency(
        amount=amount, name=name, account_id=crypto_account.id)
    db.session.add(crypto_currency)
    db.session.commit()
    return


#endregion
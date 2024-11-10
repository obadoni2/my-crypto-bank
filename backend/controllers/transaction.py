from flask import Blueprint
from flask import request, session, Response, jsonify
from config import db
from multiprocessing import Process, Queue
from model.transaction import Transaction, TransactionSchema
from model.user import User
from model.transaction_state import TransactionState
import _thread
from sha3 import keccak_256
from random import randint
from modules.modules import send_mail, update_crypto_currency
from time import sleep
from config import os
import sqlalchemy
from model.crypto_currency import CryptoCurrency
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

transaction = Blueprint("transaction", __name__)

@transaction.route("/updateTransactionState", methods=["PATCH"])
@jwt_required()
async def update_transaction_state():
    q1 = Queue()
    q2 = Queue()

    transaction_id = request.json["transaction_id"]
    state = request.json["state"]
    user_id = get_jwt_identity()["id"]
    transaction = Transaction.query.get(transaction_id)
    recipient = User.query.filter_by(email=transaction.sender).first()
    crypto_account = recipient.crypto_account

    if TransactionState[state].value == "IN_PROGRESS":
        transaction.state = TransactionState.IN_PROGRESS.value
        db.session.commit()
        update_crypto_currency(transaction.cryptocurrency, -transaction.amount,
                               crypto_account.crypto_currencies)

        _thread.start_new_thread(announce, (q1, q2))
        p = Process(target=mining,
                    args=(user_id, transaction_id, transaction.cryptocurrency,
                          transaction.amount, q1))
        p.start()
        q2.get()
    else:
        transaction.state = TransactionState.REJECTED.value
        db.session.commit()

    return Response(status=200)


@transaction.route("/validateTransaction", methods=["PATCH"])
@jwt_required()
def validate_transaction():
    user_otp = request.json["otp"]
    user_id = get_jwt_identity()["id"]
    user = User.query.get(user_id)

    if user_otp == user.otp:
        user.otp = "0"  # oznaka da je validiran
        return {"verified": "true"}
    else:
        return {"verified": "false"}


@transaction.route("/sendOtp")
@jwt_required()
def send_otp_email():
    user_id = get_jwt_identity()["id"]
    user = User.query.get(user_id)
    send_mail(user)

    return Response(status=200)


@transaction.route("/createTransaction", methods=["POST"])
@jwt_required()
def create_transaction():
    recipient_email = request.json["recepient"]
    amount = int(request.json["transferAmount"])
    cryptocurrency = request.json["currencyTransfer"]
    user_otp = request.json["otp"]
    user_id = get_jwt_identity()["id"]

    user = User.query.get(user_id)
    if user_exists(recipient_email) is True:
        if user_otp != user.otp:
            return {"error": "Validation failed, please try again"}

        if check_resources(user, cryptocurrency, amount) is False:
            return {"error": "You don't have enough resources for this transfer"}

        keccak = generate_hash(user, recipient_email, amount)
        transaction = Transaction(hashID=keccak.hexdigest(), sender=user.email, recipient=recipient_email, amount=amount,
                                  cryptocurrency=cryptocurrency, user_id=user_id, user=user, state=TransactionState.WAITING_FOR_USER.value)
        db.session.add(transaction)
        db.session.commit()
        return Response(status=200)
    else:
        return {"error": "User with that email doesn't exist"}


def check_resources(user, cryptocurrency, amount):
    user_crypto = user.crypto_account.crypto_currencies
    temp = filter(lambda x: x.name ==
                            cryptocurrency and x.amount > amount, user_crypto)
    temp = list(temp)
    if temp == []:
        return False
    else:
        return True


def generate_hash(user, recipient_email, amount):
    keccak = keccak_256()
    generated_string = "" + user.email + recipient_email + \
                       str(amount) + str(randint(0, 1000))
    keccak.update(generated_string.encode())
    return keccak


@transaction.route("/filterTransaction", methods=["POST"])
@jwt_required()
def filter_transaction():
    filter_by = request.json["filter_by"]
    value = request.json["value"]
    user_id = get_jwt_identity()["id"]
    user = User.query.get(user_id)
    all_transactions = user.transactions

    all_transactions = filter(lambda x: getattr(
        x, filter_by) == value, all_transactions)

    schema = TransactionSchema(many=True)  # ako vracam vise
    results = schema.dump(all_transactions)
    return jsonify(results), 200


# primljene i poslate njegove nema waiting for user
@transaction.route("/getTransactions")
@jwt_required()
def get_transactions():
    #user_id = session.get("user_id")
    user_id = get_jwt_identity()["id"]
    user = User.query.get(user_id)
    #all_transactions = user.transactions
    all_transactions = Transaction.query.all()
    iterator = filter(lambda x: x.state != TransactionState.WAITING_FOR_USER.value and (
        x.sender == user.email or x.recipient == user.email), all_transactions)
    # da bi vratio listu ovo ogre je iterator
    all_transactions = list(iterator)
    schema = TransactionSchema(many=True)  # ako vracam vise
    results = schema.dump(all_transactions)
    return jsonify(results)


@transaction.route("/getTransactionRequests")  # saom primljene
@jwt_required()
def get_transaction_requests():
    #user_id = session.get("user_id")
    user_id = get_jwt_identity()["id"]
    user = User.query.get(user_id)
    all_transactions = Transaction.query.all()
    iterator = filter(lambda x: x.state ==
                      TransactionState.WAITING_FOR_USER.value and x.recipient == user.email, all_transactions)
    all_transactions = list(iterator)
    schema = TransactionSchema(many=True)
    results = schema.dump(all_transactions)
    return jsonify(results)

#region Functions
def announce(q1, q2):
    q1.get()
    q2.put("done")


def mining(user_id, transaction_id, crypto_name, amount, q1):
    sleep(5 * 1)
    basedir = os.path.abspath(os.path.dirname(__file__))
    goald_dir = os.path.abspath(os.path.join(os.getcwd(),"CryptoDB.db"))
    engine = sqlalchemy.create_engine("sqlite:///" + goald_dir)
    

    local_session = sqlalchemy.orm.Session(bind=engine)

    transaction = local_session.query(Transaction).get(transaction_id)
    user = local_session.query(User).filter_by(
        email=transaction.recipient).first()
    crypto_account = user.crypto_account
    crypto_currencies = crypto_account.crypto_currencies
    iterator = filter(lambda x: x.name == crypto_name, crypto_currencies)
    crypto_currencies = list(iterator)
    if crypto_currencies == []:
        crypto_currency = CryptoCurrency(amount=amount,
                                         name=crypto_name,
                                         account_id=crypto_account.id)
        local_session.add(crypto_currency)
        local_session.commit()
    else:
        crypto_currency = next(
            filter(lambda x: x.name == crypto_name, crypto_currencies), None)
        crypto_currency.amount += amount
        if crypto_currency.amount < 0:
            return {"error": "You don't have enough cryptocurrency"}, 400
        local_session.commit()

    transaction.state = TransactionState.DONE.value
    local_session.commit()
    q1.put("done")


def user_exists(email):
    user_exist = User.query.filter_by(email=email).first()
    if user_exist is None:
        return False
    else:
        return True
#endregion
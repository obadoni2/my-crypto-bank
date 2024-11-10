import string
import random
from config import db, mail
from flask_mail import Message
import requests
import yagmail
from yagmail.error import YagConnectionClosed


def send_mail(user):
    letters = string.ascii_letters
    user.otp = ''.join(random.choice(letters) for i in range(5))
    db.session.commit()
    try:

        email = 'mailzaaplikaciju21@gmail.com'
        password = 'jabxcsxssvjkjuiu'

        yag = yagmail.SMTP(email, password)

        to_email = user.email
        subject = 'Verification Code'
        message = "Email Verification code = " + user.otp

        yag.send(
            to=to_email,
            subject=subject,
            contents=message
        )

        print('Email uspešno poslat')

    except YagConnectionClosed as e:
        print(f'Greška prilikom slanja emaila: {str(e)}')


    # import requests
    #
    # url = "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send"
    #
    # payload = {
    #     "personalizations": [
    #         {
    #             "to": [{"email": user.email}],
    #             "subject": "Verification Code"
    #         }
    #     ],
    #     "from": {"email": "crypto_bros_inc@gmail.com"},
    #     "content": [
    #         {
    #             "type": "text/plain",
    #             "value": "Email Verification code = " + user.otp
    #         }
    #     ]
    # }
    # headers = {
    #     "content-type": "application/json",
    #     "X-RapidAPI-Key": "932eab884cmshd9f6feb1e4c4f13p12e23ajsn7e8373a8eb9c",
    #     "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com"
    # }
    #
    # response = requests.request("POST", url, json=payload, headers=headers)
    # print(response)
    # if response.status_code == 202:
    #     return True
    # else:
    #     return False

def update_crypto_currency(name, amount, crypto_currencies):
    crypto_currency = next(
        filter(lambda x: x.name == name, crypto_currencies), None)
    crypto_currency.amount += amount
    if crypto_currency.amount < 0:
        return {"error": "You don't have enough cryptocurrency"}, 400
    db.session.commit()
    return






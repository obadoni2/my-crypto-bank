from flask import Flask 
from flask_cors import CORS 
from flask_session import Session 
from controllers.auth import auth 
from controllers.transaction import  transaction 
from controllers.account import account 
from datetime import datetime, timedelta
from  flask import jsonify 
from flask_jwt_extended import JWTManager
from config import db, ma, mail, bcrpt, ApplicationConfig



app = Flask(__name__)
app.config.from_object(ApplicationConfig)
app. register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(crypto, url_prefix="/crypto")
app.register_blueprint(account, url_prefix="/account")

Cors(app,supports_credentials = True)
#mail = mail(app)#ovo  obrisi ubuduce 
# enable server side session sve je  na serve sem session  id
server_session = Session(app)
jwt = JWTManager(app)
db.init_app(app)
bcrtypt.init_app(app)
mail.init_app(app)

@app.route("/create")
def create(): 
    db.create_all()
    return "all table created"

# @app.route("/authh")
# def authh():
#     access_token = create_access_token(identity="aaaaaa", expires_delta=timedelta(minutes=10))
#     return jsonify(access_token=access_token), 200

# @app.route("/reqTest")
# @jwt_required()
# def reqTest():

#     return "i need token bro"

if __name__ =="__main__":
    app.run(debug=True)
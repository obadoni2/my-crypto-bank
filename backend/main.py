from flask import Flask
from flask_cors import CORS
from flask_session import Session
from controllers.auth import auth
from controllers.crypto import crypto
from controllers.transaction import transaction
from controllers.account import account
from datetime import datetime, timedelta
from flask import jsonify
from flask_jwt_extended import JWTManager
from config import db, ma, mail, bcrypt, ApplicationConfig

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(crypto, url_prefix="/crypto")
app.register_blueprint(transaction, url_prefix="/transaction")
app.register_blueprint(account, url_prefix="/account")

CORS(app, supports_credentials=True)

#mail = Mail(app)#ovo obrisi u buduce
# enabeld server side seesion sve je na serveru sem session id
server_session = Session(app)
jwt = JWTManager(app)
db.init_app(app)
ma.init_app(app)
bcrypt.init_app(app)
mail.init_app(app)

@app.route("/create")
def create():
    db.create_all()
    return "All tables created"

# @app.route("/authh")
# def authh():
#     access_token = create_access_token(identity="aaaaaa", expires_delta=timedelta(minutes=10))
#     return jsonify(access_token=access_token), 200

# @app.route("/reqTest")
# @jwt_required()
# def reqTest():

#     return "i need token bro"

def init_database():
    """Initialize the database tables."""
    with app.app_context():
        db.create_all()
        print("Database initialized successfully")

def wipe_database():
    """Drop all database tables."""
    with app.app_context():
        db.drop_all()
        print("Database wiped successfully")

def run_server(debug=False, port=5000):
    """Run the Flask application server."""
    app.run(debug=debug, port=port)

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='CLI commands for managing the Flask application')
    subparsers = parser.add_subparsers(dest='command', help='Commands')

    # Run command (default)
    run_parser = subparsers.add_parser('run', help='Run the Flask application')
    run_parser.add_argument('--debug', action='store_true', help='Run in debug mode')
    run_parser.add_argument('--port', type=int, default=5000, help='Port to run the server on')

    # Init command
    subparsers.add_parser('init', help='Initialize the database')

    # Wipe command
    subparsers.add_parser('wipe', help='Wipe the database')

    args = parser.parse_args()

    # Default to 'run' if no command is specified
    if not args.command:
        args.command = 'run'
        args.debug = False
        args.port = 5000

    # Execute the appropriate command
    if args.command == 'run':
        run_server(args.debug, args.port)
    elif args.command == 'init':
        init_database()
    elif args.command == 'wipe':
        wipe_database()
    else:
        print("Invalid command. Use 'python main.py --help' for usage information.")

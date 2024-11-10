from functools import wraps

from flask import jsonify
from flask_jwt_extended import (
    verify_jwt_in_request, get_jwt_identity
)

def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt_identity()
            if claims["role"] == "ADMIN":
                return fn(*args, **kwargs)
            else:
                return jsonify(msg="Admins only!"), 403

        return decorator

    return wrapper
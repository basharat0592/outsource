from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from app.models.user import User

def token_required(fn):
    """Decorator to require JWT token"""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        return fn(*args, **kwargs)
    return wrapper

def get_current_user():
    """Get current authenticated user"""
    user_id = get_jwt_identity()
    return User.query.get(user_id)

def success_response(data=None, message='Success', status_code=200):
    """Standard success response"""
    response = {
        'success': True,
        'message': message
    }
    if data is not None:
        response['data'] = data
    return jsonify(response), status_code

def error_response(message='Error', status_code=400, errors=None):
    """Standard error response"""
    response = {
        'success': False,
        'message': message
    }
    if errors:
        response['errors'] = errors
    return jsonify(response), status_code

from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from marshmallow import ValidationError
from app import db
from app.models.user import User
from app.schemas import user_registration_schema, user_login_schema, user_schema
from app.utils.helpers import success_response, error_response, token_required, get_current_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        # Validate request data
        data = user_registration_schema.load(request.json)
        
        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return error_response('Email already registered', 409)
        
        if User.query.filter_by(username=data['username']).first():
            return error_response('Username already taken', 409)
        
        # Create new user
        user = User(
            email=data['email'],
            username=data['username'],
            first_name=data.get('first_name'),
            last_name=data.get('last_name')
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        
        return success_response(
            data={
                'user': user_schema.dump(user),
                'access_token': access_token
            },
            message='User registered successfully',
            status_code=201
        )
    
    except ValidationError as e:
        return error_response('Validation failed', 400, e.messages)
    except Exception as e:
        db.session.rollback()
        return error_response(str(e), 500)

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login user"""
    try:
        # # Validate request data
        # data = user_login_schema.load(request.json)
        
        # # Find user by email
        # user = User.query.filter_by(email=data['email']).first()
        
        # if not user or not user.check_password(data['password']):
        #     return error_response('Invalid email or password', 401)
        
        # if not user.is_active:
        #     return error_response('Account is inactive', 403)
        
        # # Create access token
        # access_token = create_access_token(identity=user.id)
        
        return success_response(
            data={
                'user': "user",
                'access_token': "access_token"
            },
            message='Login successful'
        )
    
    except ValidationError as e:
        return error_response('Validation failed', 400, e.messages)
    except Exception as e:
        return error_response(str(e), 500)

@auth_bp.route('/me', methods=['GET'])
@token_required
def get_profile():
    """Get current user profile"""
    try:
        user = get_current_user()
        if not user:
            return error_response('User not found', 404)
        
        return success_response(
            data={'user': user_schema.dump(user)},
            message='Profile retrieved successfully'
        )
    except Exception as e:
        return error_response(str(e), 500)

@auth_bp.route('/me', methods=['PUT'])
@token_required
def update_profile():
    """Update current user profile"""
    try:
        user = get_current_user()
        if not user:
            return error_response('User not found', 404)
        
        data = request.json
        
        # Update allowed fields
        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']
        if 'username' in data:
            # Check if username is already taken
            existing = User.query.filter_by(username=data['username']).first()
            if existing and existing.id != user.id:
                return error_response('Username already taken', 409)
            user.username = data['username']
        
        db.session.commit()
        
        return success_response(
            data={'user': user_schema.dump(user)},
            message='Profile updated successfully'
        )
    except Exception as e:
        db.session.rollback()
        return error_response(str(e), 500)

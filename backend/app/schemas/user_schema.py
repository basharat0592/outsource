from app import ma
from app.models.user import User

class UserSchema(ma.SQLAlchemyAutoSchema):
    """User serialization schema"""
    class Meta:
        model = User
        load_instance = True
        exclude = ('password_hash',)
        
class UserRegistrationSchema(ma.Schema):
    """Schema for user registration"""
    email = ma.Email(required=True)
    username = ma.Str(required=True)
    password = ma.Str(required=True, load_only=True)
    first_name = ma.Str()
    last_name = ma.Str()

class UserLoginSchema(ma.Schema):
    """Schema for user login"""
    email = ma.Email(required=True)
    password = ma.Str(required=True, load_only=True)

# Initialize schemas
user_schema = UserSchema()
users_schema = UserSchema(many=True)
user_registration_schema = UserRegistrationSchema()
user_login_schema = UserLoginSchema()

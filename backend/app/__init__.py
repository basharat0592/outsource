from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_marshmallow import Marshmallow

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()
ma = Marshmallow()

def create_app(config_name='default'):
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Load configuration
    from config import config
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, origins=app.config['CORS_ORIGINS'])
    ma.init_app(app)
    
    # Register blueprints
    from app.api import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')
    
    # Register error handlers
    from app.utils.error_handlers import register_error_handlers
    register_error_handlers(app)
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app

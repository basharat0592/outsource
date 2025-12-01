from flask import Blueprint
from app.api.auth import auth_bp
from app.api.health import health_bp

# Create main API blueprint
api_bp = Blueprint('api', __name__)

# Register sub-blueprints
api_bp.register_blueprint(auth_bp, url_prefix='/auth')
api_bp.register_blueprint(health_bp)

__all__ = ['api_bp']

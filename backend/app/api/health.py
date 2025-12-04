from flask import Blueprint
from app.utils.helpers import success_response

health_bp = Blueprint('health', __name__)

@health_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return success_response(
        data={'status': 'healthy'},
        message='API is running'
    )

@health_bp.route('/ping', methods=['GET'])
def ping():
    """Ping endpoint"""
    return success_response(
        data={'message': 'pong'},
        message='Server is responsive'
    )

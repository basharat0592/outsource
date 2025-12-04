from flask import jsonify
from werkzeug.exceptions import HTTPException
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError

def register_error_handlers(app):
    """Register error handlers for the application"""
    
    @app.errorhandler(ValidationError)
    def handle_validation_error(error):
        """Handle Marshmallow validation errors"""
        return jsonify({
            'success': False,
            'error': 'Validation Error',
            'messages': error.messages
        }), 400
    
    @app.errorhandler(IntegrityError)
    def handle_integrity_error(error):
        """Handle database integrity errors"""
        return jsonify({
            'success': False,
            'error': 'Database Error',
            'message': 'A record with this information already exists'
        }), 409
    
    @app.errorhandler(HTTPException)
    def handle_http_exception(error):
        """Handle HTTP exceptions"""
        return jsonify({
            'success': False,
            'error': error.name,
            'message': error.description
        }), error.code
    
    @app.errorhandler(Exception)
    def handle_generic_error(error):
        """Handle generic exceptions"""
        app.logger.error(f'Unhandled exception: {str(error)}')
        return jsonify({
            'success': False,
            'error': 'Internal Server Error',
            'message': 'An unexpected error occurred'
        }), 500

import os
from app import create_app

# Get environment from environment variable or default to development
env = os.getenv('FLASK_ENV', 'development')
app = create_app(env)

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=int(os.getenv('PORT', 5000)),
        debug=app.config['DEBUG']
    )

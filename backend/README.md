# Flask Backend - Outsource Project

A production-ready Flask backend with PostgreSQL, JWT authentication, and RESTful API structure.

## 🚀 Features

- **Flask Application Factory Pattern** - Scalable app structure
- **PostgreSQL Database** - Robust relational database with SQLAlchemy ORM
- **JWT Authentication** - Secure token-based authentication
- **RESTful API** - Well-organized API endpoints with blueprints
- **Input Validation** - Marshmallow schemas for data validation
- **Error Handling** - Centralized error handling with consistent responses
- **CORS Support** - Cross-origin resource sharing enabled
- **Database Migrations** - Flask-Migrate for database version control

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py          # Application factory
│   ├── api/                 # API blueprints
│   │   ├── __init__.py      # Main API blueprint
│   │   ├── auth.py          # Authentication endpoints
│   │   └── health.py        # Health check endpoints
│   ├── models/              # Database models
│   │   ├── __init__.py
│   │   └── user.py          # User model
│   ├── schemas/             # Marshmallow schemas
│   │   ├── __init__.py
│   │   └── user_schema.py   # User serialization schemas
│   └── utils/               # Utility functions
│       ├── __init__.py
│       ├── error_handlers.py # Error handlers
│       └── helpers.py        # Helper functions
├── config.py                # Configuration settings
├── main.py                  # Application entry point
├── requirements.txt         # Python dependencies
└── env.example              # Environment variables template

## 🛠️ Setup Instructions

### 1. Prerequisites

- Python 3.8+
- PostgreSQL 12+
- pip

### 2. Installation

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On macOS/Linux:
source .venv/bin/activate
# On Windows:
.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb outsource_db

# Or using psql:
psql -U postgres
CREATE DATABASE outsource_db;
\q
```

### 4. Environment Configuration

```bash
# Copy environment template
cp env.example .env

# Edit .env file with your configuration
# Update DATABASE_URL, SECRET_KEY, JWT_SECRET_KEY
```

### 5. Database Migrations

```bash
# Initialize migrations
flask db init

# Create initial migration
flask db migrate -m "Initial migration"

# Apply migrations
flask db upgrade
```

### 6. Run the Application

```bash
# Development mode
python main.py

# Or using Flask CLI
flask run

# Production mode with Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 main:app
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Check API health status
- `GET /api/ping` - Ping server

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile (requires JWT)
- `PUT /api/auth/me` - Update current user profile (requires JWT)

## 📝 API Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "johndoe",
    "password": "securepassword123",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

### Get Profile (with JWT)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔧 Configuration

Edit `.env` file for configuration:

```env
# Flask
FLASK_APP=app
FLASK_ENV=development
FLASK_DEBUG=True

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/outsource_db

# JWT
JWT_SECRET_KEY=your-secret-key
JWT_ACCESS_TOKEN_EXPIRES=3600

# CORS
CORS_ORIGINS=http://localhost:3000

# App
SECRET_KEY=your-app-secret-key
```

## 🧪 Testing

```bash
# Run tests (when implemented)
pytest

# Run with coverage
pytest --cov=app
```

## 📦 Dependencies

- **Flask** - Web framework
- **Flask-SQLAlchemy** - ORM for database
- **Flask-Migrate** - Database migrations
- **Flask-JWT-Extended** - JWT authentication
- **Flask-CORS** - CORS support
- **Flask-Marshmallow** - Serialization/deserialization
- **psycopg2-binary** - PostgreSQL adapter
- **python-dotenv** - Environment variables
- **bcrypt** - Password hashing
- **gunicorn** - Production WSGI server

## 🔐 Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS configured for specific origins
- Input validation with Marshmallow
- SQL injection prevention via SQLAlchemy ORM

## 📄 License

MIT License
```


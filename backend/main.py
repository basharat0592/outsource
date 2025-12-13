from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import datetime, timedelta
import json
import jwt

# Humari apni banayi hui files import kar rahe hain
import models
import schemas
from database import engine, get_db

# ========== FASTAPI APP ==========
app = FastAPI(
    title="Outsource CRM System",
    description="Complete CRM for Accounting Firm with Task Management",
    version="2.0.0"
)

# ========== CORS (Frontend Connection ke liye) ==========
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========== SECURITY & AUTH ==========
security = HTTPBearer()
SECRET_KEY = "secret-key"  # Production mein isse strong rakhein

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    user = db.query(models.User).filter(models.User.username == username).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user

# ========== HELPER FUNCTIONS ==========
def create_notification(db: Session, user_id: int, message: str, notification_type: str = None, task_id: int = None):
    notification = models.Notification(
        user_id=user_id,
        task_id=task_id,  # <--- NEW
        message=message,
        notification_type=notification_type
    )
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification

def create_activity(db: Session, user_id: int, activity_type: str, description: str = None):
    activity = models.Activity(
        user_id=user_id,
        activity_type=activity_type,
        description=description
    )
    db.add(activity)
    db.commit()
    db.refresh(activity)
    return activity

# ========== AUTH ENDPOINTS ==========
@app.post("/login")
def login(login_data: schemas.LoginRequest, db: Session = Depends(get_db)):
    # Logic Update: Check Username OR Email
    user = db.query(models.User).filter(
        ((models.User.username == login_data.username) | (models.User.email == login_data.username)) &
        (models.User.password == login_data.password)
    ).first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials (email or password incorrect)")
    
    # Create token
    access_token = jwt.encode(
        {"sub": user.username, "exp": datetime.utcnow() + timedelta(minutes=60)},
        SECRET_KEY,
        algorithm="HS256"
    )
    
    create_activity(db, user.user_id, "login", f"User logged in via Login Page")
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@app.post("/forgot-password")
def forgot_password(request: schemas.ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if not user:
        # Security: User ko mat batao ki email nahi mila
        raise HTTPException(status_code=404, detail="Email address not found")
    
    return {"message": "If this email exists, a password reset link has been sent."}

@app.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(
        (models.User.username == user.username) | (models.User.email == user.email)
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already exists")
    
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    create_activity(db, db_user.user_id, "user_registered", f"New user registered: {user.username}")
    
    return db_user

# ========== USER ENDPOINTS ==========
@app.get("/users", response_model=List[schemas.UserResponse])
def get_users(skip: int = 0, limit: int = 100, search: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.User)
    if search:
        query = query.filter(
            (models.User.username.ilike(f"%{search}%")) |
            (models.User.first_name.ilike(f"%{search}%")) |
            (models.User.last_name.ilike(f"%{search}%")) |
            (models.User.email.ilike(f"%{search}%"))
        )
    users = query.offset(skip).limit(limit).all()
    return users

@app.get("/users/{user_id}", response_model=schemas.UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# ========== ROLE ENDPOINTS (NEW ADDED) ==========
@app.get("/permissions-list")
def get_permissions_list():
    """Returns the list of checkboxes shown in the Add Role image"""
    return {
        "Client": ["add", "change", "delete", "view"],
        "Role": ["add", "change", "delete", "view"],
        "Task": ["add", "change", "delete", "view", "review", "submit", "confirm_completed"],
        "UserRole": ["add", "change", "delete", "view"],
        "User": ["change", "delete", "view", "invite"]
    }

@app.get("/roles", response_model=List[schemas.RoleResponse])
def get_roles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    roles = db.query(models.Role).offset(skip).limit(limit).all()
    # Database se Text aata hai, usay wapis JSON banate hain
    for role in roles:
        if role.permissions:
            role.permissions = json.loads(role.permissions)
        else:
            role.permissions = {}
    return roles

@app.post("/roles", response_model=schemas.RoleResponse, status_code=status.HTTP_201_CREATED)
@app.post("/roles", response_model=schemas.RoleResponse, status_code=status.HTTP_201_CREATED)
def create_role(role: schemas.RoleBase, db: Session = Depends(get_db)):
    existing = db.query(models.Role).filter(models.Role.role_name == role.role_name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Role already exists")
    
    # Frontend se Dictionary aati hai, usay Text banakar save karte hain
    perms_json = json.dumps(role.permissions) if role.permissions else "{}"
    
    new_role = models.Role(
        role_name=role.role_name, # Fixed: removed .role
        description=role.description,
        permissions=perms_json
    )
    db.add(new_role)
    db.commit()
    db.refresh(new_role)
    
    # Response bhejte waqt wapis JSON bana dete hain
    new_role.permissions = json.loads(new_role.permissions)
    return new_role

# ========== CLIENT ENDPOINTS ==========
@app.get("/client-types")
def get_client_types():
    """Returns list of client types for the Add Client dropdown"""
    return [
        {"value": t.value, "label": t.value.replace("_", " ").title()} 
        for t in schemas.ClientType
    ]

@app.get("/clients", response_model=List[schemas.ClientResponse])
def get_clients(skip: int = 0, limit: int = 100, client_type: Optional[schemas.ClientType] = None, search: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Client)
    if client_type:
        query = query.filter(models.Client.client_type == client_type)
    if search:
        query = query.filter(models.Client.client_name.ilike(f"%{search}%"))
    clients = query.order_by(models.Client.created_at.desc()).offset(skip).limit(limit).all()
    return clients

@app.post("/clients", response_model=schemas.ClientResponse, status_code=status.HTTP_201_CREATED)
def create_client(client: schemas.ClientCreate, db: Session = Depends(get_db)):
    new_client = models.Client(**client.dict())
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    create_activity(db, 1, "client_created", f"Created client: {client.client_name}")
    return new_client

# ========== TASK ENDPOINTS ==========
@app.get("/tasks", response_model=List[schemas.TaskResponse])
def get_tasks(
    skip: int = 0, limit: int = 100, 
    status: Optional[schemas.TaskStatus] = None, 
    client_id: Optional[int] = None, 
    task_type_id: Optional[int] = None, 
    search: Optional[str] = None, 
    db: Session = Depends(get_db)
):
    query = db.query(models.Task)
    
    if status:
        query = query.filter(models.Task.status == status)
    if client_id:
        query = query.filter(models.Task.client_id == client_id)
    if task_type_id:
        query = query.filter(models.Task.task_type_id == task_type_id)
    if search:
        query = query.filter(models.Task.title.ilike(f"%{search}%"))
    
    tasks = query.order_by(models.Task.due_date).offset(skip).limit(limit).all()
    
    # Process attachments JSON
    result = []
    for task in tasks:
        task_dict = {
            "task_id": task.task_id,
            "title": task.title,
            "description": task.description,
            "due_date": task.due_date,
            "time_estimate": task.time_estimate,
            "billable_time": task.billable_time,
            "status": task.status,
            "task_type_id": task.task_type_id,
            "client_id": task.client_id,
            "agent_id": task.agent_id,
            "attachments": json.loads(task.attachments) if task.attachments else [],
            "created_at": task.created_at,
            "updated_at": task.updated_at,
        }
        result.append(task_dict)
    
    return result

@app.post("/tasks", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    # Validate Client
    if task.client_id:
        client = db.query(models.Client).filter(models.Client.client_id == task.client_id).first()
        if not client:
            raise HTTPException(status_code=404, detail="Client not found")
    
    # JSON convert attachments
    attachments_json = json.dumps(task.attachments) if task.attachments else None
    
    new_task = models.Task(
        title=task.title,
        description=task.description,
        due_date=task.due_date,
        time_estimate=task.time_estimate,
        billable_time=task.billable_time,
        status=task.status.value if task.status else "pending",
        task_type_id=task.task_type_id,
        client_id=task.client_id,
        agent_id=task.agent_id,
        attachments=attachments_json
    )
    
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    
    create_activity(db, 1, "task_created", f"Created task: {task.title}")
    
    # Jahan notification bhej rahe thay, wahan task_id pass karein:
    if task.agent_id:
        create_notification(
            db, 
            task.agent_id, 
            f"New task assigned: {task.title}", 
            "task_assigned",
            task_id=new_task.task_id # <--- NEW
        )
    # Format for response
    new_task.attachments = json.loads(new_task.attachments) if new_task.attachments else []
    return new_task

@app.put("/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task_update: schemas.TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.task_id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_data = task_update.dict(exclude_unset=True)
    
    if 'attachments' in update_data:
        update_data['attachments'] = json.dumps(update_data['attachments']) if update_data['attachments'] else None
    
    if 'status' in update_data and update_data['status']:
        update_data['status'] = update_data['status'].value
    
    for field, value in update_data.items():
        setattr(db_task, field, value)
    
    db.commit()
    db.refresh(db_task)
    
    create_activity(db, 1, "task_updated", f"Updated task: {db_task.title}")
    
    # Format for response
    if db_task.attachments:
        db_task.attachments = json.loads(db_task.attachments)
    else:
        db_task.attachments = []
        
    return db_task
# ========== COMMENT ENDPOINTS ==========
@app.get("/tasks/{task_id}/comments", response_model=List[schemas.CommentResponse])
def get_task_comments(task_id: int, db: Session = Depends(get_db)):
    comments = db.query(models.Comment).filter(models.Comment.task_id == task_id).order_by(models.Comment.created_at.desc()).all()
    return comments

@app.post("/comments", response_model=schemas.CommentResponse, status_code=status.HTTP_201_CREATED)
def create_comment(comment: schemas.CommentCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    # Note: Hum current_user le rahe hain taaki pata chale comment kisne kiya
    task = db.query(models.Task).filter(models.Task.task_id == comment.task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    new_comment = models.Comment(
        content=comment.content,
        task_id=comment.task_id,
        user_id=current_user.user_id # Logged in user ka ID
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    
    # Notify Agent if someone else comments
    if task.agent_id and task.agent_id != current_user.user_id:
        create_notification(
            db, 
            task.agent_id, 
            f"New comment on task '{task.title}'", 
            "comment_added",
            task_id=task.task_id
        )
    
    return new_comment

# ========== NOTIFICATION & OTHER ENDPOINTS ==========
@app.get("/notifications", response_model=List[schemas.NotificationResponse])
def get_notifications(user_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(models.Notification)
    if user_id:
        query = query.filter(models.Notification.user_id == user_id)
    return query.order_by(models.Notification.created_at.desc()).all()

@app.get("/task-types", response_model=List[schemas.TaskTypeResponse])
def get_task_types(db: Session = Depends(get_db)):
    return db.query(models.TaskType).all()

# ========== DASHBOARD ==========
@app.get("/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_tasks = db.query(models.Task).count()
    total_clients = db.query(models.Client).count()
    total_users = db.query(models.User).count()
    
    tasks_by_status = db.query(models.Task.status, func.count(models.Task.task_id)).group_by(models.Task.status).all()
    
    return {
        "stats": {
            "total_tasks": total_tasks,
            "total_clients": total_clients,
            "total_users": total_users
        },
        "tasks_by_status": dict(tasks_by_status)
    }

# ========== STARTUP EVENT (Create Tables & Default Data) ==========
@app.on_event("startup")
def startup_event():
    # Tables Create karna
    models.Base.metadata.create_all(bind=engine)
    
    db = next(get_db())
    try:
        # Default Task Types
        default_task_types = [
            {"type_name": "Payroll", "description": "Payroll processing"},
            {"type_name": "VAT Returns", "description": "Preparation of VAT returns"},
            {"type_name": "Bookkeeping", "description": "Day to day bookkeeping"},
        ]
        for tt in default_task_types:
            exists = db.query(models.TaskType).filter(models.TaskType.type_name == tt["type_name"]).first()
            if not exists:
                db.add(models.TaskType(**tt))
        
        # Default Admin User
        admin_exists = db.query(models.User).filter(models.User.username == "admin").first()
        if not admin_exists:
            admin_user = models.User(
                username="admin",
                email="admin@outsource.com",
                password="admin123", # Real app mein hash karna chahiye
                first_name="Admin",
                last_name="User",
                job_title="Administrator"
            )
            db.add(admin_user)
        
        db.commit()
        print("✅ Database tables and default data ready!")
        
    except Exception as e:
        print(f"⚠️ Startup Error: {e}")
        db.rollback()
    finally:
        db.close()

# ========== ROOT ==========
@app.get("/")
async def root():
    return {"message": "Outsource CRM API is Running", "status": "active"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

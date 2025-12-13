from pydantic import BaseModel, validator, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum as PyEnum
import re

# ========== ENUMS ==========
class TaskStatus(str, PyEnum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CUSTOMER_REVIEW = "customer_review"
    INTERNAL_REVIEW = "internal_review"
    ESTIMATE_PROVIDED = "estimate_provided"
    ESTIMATE_ACCEPTED = "estimate_accepted"

class ClientType(str, PyEnum):
    COMPANY = "company"
    SOLE_TRADER = "sole_trader"
    PARTNERSHIP = "partnership"
    LIMITED_LIABILITY_PARTNERSHIP = "limited_liability_partnership"
    PERSONAL = "personal"

class NotificationStatus(str, PyEnum):
    UNREAD = "unread"
    READ = "read"

# ========== HELPER FUNCTIONS ==========
def validate_email_format(email: str) -> bool:
    """Simple email validation using regex"""
    pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return bool(re.match(pattern, email))

# ========== PYDANTIC MODELS ==========

# --- Forgot Password ---
class ForgotPasswordRequest(BaseModel):
    email: str

# --- User Schemas ---
class UserBase(BaseModel):
    username: str
    email: str 
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    job_title: Optional[str] = None
    
    @validator('email')
    def validate_email(cls, v):
        if not validate_email_format(v):
            raise ValueError('Invalid email format')
        return v

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    job_title: Optional[str] = None
    password: Optional[str] = None
    
    @validator('email')
    def validate_email(cls, v):
        if v is not None and not validate_email_format(v):
            raise ValueError('Invalid email format')
        return v

class UserResponse(UserBase):
    user_id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# --- Client Schemas ---
class ClientBase(BaseModel):
    client_name: str
    client_type: Optional[ClientType] = ClientType.COMPANY
    contact_email: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    tax_number: Optional[str] = None
    registration_number: Optional[str] = None
    
    @validator('contact_email')
    def validate_email(cls, v):
        if v is not None and not validate_email_format(v):
            raise ValueError('Invalid email format')
        return v

class ClientCreate(ClientBase):
    pass

class ClientUpdate(BaseModel):
    client_name: Optional[str] = None
    client_type: Optional[ClientType] = None
    contact_email: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    tax_number: Optional[str] = None
    registration_number: Optional[str] = None
    
    @validator('contact_email')
    def validate_email(cls, v):
        if v is not None and not validate_email_format(v):
            raise ValueError('Invalid email format')
        return v

class ClientResponse(ClientBase):
    client_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# --- Task Type Schemas ---
class TaskTypeBase(BaseModel):
    type_name: str
    description: Optional[str] = None

class TaskTypeResponse(TaskTypeBase):
    task_type_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- Task Schemas ---
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    time_estimate: Optional[float] = None
    billable_time: Optional[float] = None
    status: Optional[TaskStatus] = TaskStatus.PENDING
    task_type_id: Optional[int] = None
    client_id: Optional[int] = None
    agent_id: Optional[int] = None
    attachments: Optional[List[str]] = None

# backend/schemas.py mein jahan "class TaskCreate(TaskBase): pass" likha hai,
# usay hata kar ye paste karein:

class TaskCreate(TaskBase):
    client_id: int        # <--- Humne isay Optional se Required (Integer) bana diya
    task_type_id: int     # <--- Isay bhi Required (Integer) bana diya
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    time_estimate: Optional[float] = None
    billable_time: Optional[float] = None
    status: Optional[TaskStatus] = None
    task_type_id: Optional[int] = None
    client_id: Optional[int] = None
    agent_id: Optional[int] = None
    attachments: Optional[List[str]] = None

class TaskResponse(BaseModel):
    task_id: int
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    time_estimate: Optional[float] = None
    billable_time: Optional[float] = None
    status: str
    task_type_id: Optional[int] = None
    client_id: Optional[int] = None
    agent_id: Optional[int] = None
    attachments: Optional[List[str]] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# --- Comment Schemas ---
class CommentBase(BaseModel):
    content: str
    task_id: int

class CommentCreate(CommentBase):
    pass

class CommentResponse(CommentBase):
    comment_id: int
    user_id: Optional[int] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- Notification Schemas ---
class NotificationBase(BaseModel):
    message: str
    notification_type: Optional[str] = None

class NotificationCreate(NotificationBase):
    user_id: int

class NotificationUpdate(BaseModel):
    status: Optional[NotificationStatus] = None

class NotificationResponse(NotificationBase):
    notification_id: int
    user_id: int
    task_id: Optional[int] = None
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- Role Schemas ---
class RoleBase(BaseModel):
    role_name: str
    description: Optional[str] = None
    permissions: Optional[Dict[str, List[str]]] = None

class RoleResponse(RoleBase):
    role_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- Agent Schemas ---
class AgentBase(BaseModel):
    agent_name: str
    user_id: Optional[int] = None
    status: Optional[str] = "active"

class AgentResponse(AgentBase):
    agent_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# --- Activity Schemas ---
class ActivityResponse(BaseModel):
    activity_id: int
    user_id: int
    activity_type: str
    description: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- Organization Schemas ---
class OrganizationBase(BaseModel):
    org_name: str
    org_type: Optional[str] = None
    address: Optional[str] = None

class OrganizationResponse(OrganizationBase):
    organization_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
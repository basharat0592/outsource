from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text, Float, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base  # Humne database.py se Base import kiya hai

class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    first_name = Column(String(100))
    last_name = Column(String(100))
    job_title = Column(String(100))
    profile_picture = Column(String(500))
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP, default=func.now())
    updated_at = Column(TIMESTAMP, default=func.now(), onupdate=func.now())
    
    # Relationships
    roles = relationship("Role", secondary="user_roles", back_populates="users")
    agent = relationship("Agent", back_populates="user", uselist=False)
    comments = relationship("Comment", back_populates="user")
    notifications = relationship("Notification", back_populates="user")
    activities = relationship("Activity", back_populates="user")
    # Note: Tasks access karne ke liye user.agent.tasks use karein

class Role(Base):
    __tablename__ = 'roles'
    role_id = Column(Integer, primary_key=True, index=True)
    role_name = Column(String(100), unique=True, nullable=False)
    description = Column(Text)
    permissions = Column(Text)  # <--- NEW: Permissions ko JSON text ki tarah save karenge
    created_at = Column(TIMESTAMP, default=func.now())
    
    # Relationships
    users = relationship("User", secondary="user_roles", back_populates="roles")

class UserRole(Base):
    __tablename__ = 'user_roles'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id', ondelete='CASCADE'))
    role_id = Column(Integer, ForeignKey('roles.role_id', ondelete='CASCADE'))
    created_at = Column(TIMESTAMP, default=func.now())

class Agent(Base):
    __tablename__ = 'agents'
    agent_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id', ondelete='SET NULL'), nullable=True)
    agent_name = Column(String(255), nullable=False)
    status = Column(String(50), default='active')
    created_at = Column(TIMESTAMP, default=func.now())
    updated_at = Column(TIMESTAMP, default=func.now(), onupdate=func.now())
    
    user = relationship("User", back_populates="agent")
    tasks = relationship("Task", back_populates="assigned_agent")

class TaskType(Base):
    __tablename__ = 'task_types'
    task_type_id = Column(Integer, primary_key=True, index=True)
    type_name = Column(String(255), unique=True, nullable=False)
    description = Column(Text)
    created_at = Column(TIMESTAMP, default=func.now())
    
    tasks = relationship("Task", back_populates="task_type")

class Client(Base):
    __tablename__ = 'clients'
    client_id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String(255), nullable=False)
    client_type = Column(String(50))
    contact_email = Column(String(255))
    phone_number = Column(String(20))
    address = Column(Text)
    tax_number = Column(String(50))
    registration_number = Column(String(50))
    created_at = Column(TIMESTAMP, default=func.now())
    updated_at = Column(TIMESTAMP, default=func.now(), onupdate=func.now())
    
    tasks = relationship("Task", back_populates="client")

class Task(Base):
    __tablename__ = 'tasks'
    task_id = Column(Integer, primary_key=True, index=True)
    task_type_id = Column(Integer, ForeignKey('task_types.task_type_id', ondelete='SET NULL'), nullable=True)
    agent_id = Column(Integer, ForeignKey('agents.agent_id', ondelete='SET NULL'), nullable=True)
    client_id = Column(Integer, ForeignKey('clients.client_id', ondelete='CASCADE'))
    title = Column(String(255))
    description = Column(Text)
    due_date = Column(TIMESTAMP)
    time_estimate = Column(Float)
    billable_time = Column(Float)
    status = Column(String(50), default='pending')
    attachments = Column(Text)
    created_at = Column(TIMESTAMP, default=func.now())
    updated_at = Column(TIMESTAMP, default=func.now(), onupdate=func.now())
    
    task_type = relationship("TaskType", back_populates="tasks")
    assigned_agent = relationship("Agent", back_populates="tasks")
    client = relationship("Client", back_populates="tasks")
    comments = relationship("Comment", back_populates="task", cascade="all, delete-orphan")

class Comment(Base):
    __tablename__ = 'comments'
    comment_id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey('tasks.task_id', ondelete='CASCADE'))
    user_id = Column(Integer, ForeignKey('users.user_id', ondelete='SET NULL'), nullable=True)
    content = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP, default=func.now())
    
    task = relationship("Task", back_populates="comments")
    user = relationship("User", back_populates="comments")

class Notification(Base):
    __tablename__ = 'notifications'
    notification_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id', ondelete='CASCADE'))
    task_id = Column(Integer, ForeignKey('tasks.task_id', ondelete='CASCADE'), nullable=True) # <--- NEW: Link to Task
    message = Column(Text, nullable=False)
    notification_type = Column(String(50))
    status = Column(String(50), default='unread')
    created_at = Column(TIMESTAMP, default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="notifications")

class Activity(Base):
    __tablename__ = 'activities'
    activity_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id', ondelete='CASCADE'))
    activity_type = Column(String(100))
    description = Column(Text)
    created_at = Column(TIMESTAMP, default=func.now())
    
    user = relationship("User", back_populates="activities")

class Organization(Base):
    __tablename__ = 'organizations'
    organization_id = Column(Integer, primary_key=True, index=True)
    org_name = Column(String(255), unique=True, nullable=False)
    org_type = Column(String(100))
    address = Column(Text)
    created_at = Column(TIMESTAMP, default=func.now())
    updated_at = Column(TIMESTAMP, default=func.now(), onupdate=func.now())
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  job_title?: string;
}

export interface Client {
  client_id: number;
  client_name: string;
  email: string;
  phone?: string;
  status: string;
}

export interface Task {
  task_id: number;
  title: string; // Service Type (e.g., Payroll)
  description?: string;
  status: string;
  due_date: string;
  client_name: string;
  assigned_to?: string;
}

export interface Role {
  role_id: number;
  role_name: string;
  description: string;
}

export interface Comment {
  id: number;
  task_id: number;
  user_name: string; // User ka naam jo comment kar raha hai
  content: string;
  created_at: string;
}
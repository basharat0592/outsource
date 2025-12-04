import api from './api';
export const login = (data: { email: string; password: string }) => api.post('/auth/login', data);
export const signup = (data: { email: string; password: string }) => api.post('/auth/signup', data);
export const forgotPassword = (data: { email: string }) => api.post('/auth/forgot-password', data);
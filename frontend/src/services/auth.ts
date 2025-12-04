import { API_PATHS } from '@/utils/constants';
import api from './api';
export const login = async (data: { email: string; password: string }) => {
    try {
        const res = await api.post(API_PATHS.LOGIN, data);
        return res.data;
    }
    catch (error) {
        console.log("Error in login api : ", error)
        return undefined
    }
}

export const signup = (data: { email: string; password: string }) => api.post('/auth/signup', data);
export const forgotPassword = (data: { email: string }) => api.post('/auth/forgot-password', data);
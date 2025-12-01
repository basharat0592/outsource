import { useAuthStore } from '@/store/authStore';
export const useAuth = () => {
const token = useAuthStore(state => state.token);
const setToken = useAuthStore(state => state.setToken);
const isAuthenticated = !!token;
return { token, setToken, isAuthenticated };
};
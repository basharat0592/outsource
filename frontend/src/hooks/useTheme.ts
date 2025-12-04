import { useAppStore } from '@/store/appStore';
export const useTheme = () => {
const theme = useAppStore(state => state.theme);
const setTheme = useAppStore(state => state.setTheme);
return { theme, setTheme };
};
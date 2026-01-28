import { create } from 'zustand';
import { api } from '@/lib/api-client';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('auth_token'),
    isLoading: false,

    login: async (email, password) => {
        set({ isLoading: true });
        try {
            const { token, user } = await api.post<{ token: string; user: User }>('/auth/login', {
                email,
                password,
            });
            localStorage.setItem('auth_token', token);
            set({ token, user, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('auth_token');
        set({ user: null, token: null });
    },

    checkAuth: async () => {
        const token = localStorage.getItem('auth_token');
        if (!token) return;

        set({ isLoading: true });
        try {
            const user = await api.get<User>('/auth/me');
            set({ user, isLoading: false });
        } catch (error) {
            localStorage.removeItem('auth_token');
            set({ user: null, token: null, isLoading: false });
        }
    },
}));

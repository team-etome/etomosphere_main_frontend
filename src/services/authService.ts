import { apiClient } from '../lib/axios';
import { AuthResponse, AuthUser, LoginCredentials } from '../types/auth.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
    }
    return data;
  },

  getCurrentUser: async (): Promise<AuthUser> => {
    const { data } = await apiClient.get<AuthUser>('/auth/me');
    localStorage.setItem('auth_user', JSON.stringify(data));
    return data;
  },

  initiateGoogleLogin: () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    window.location.href = `${baseUrl}/auth/google`;
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  },
};
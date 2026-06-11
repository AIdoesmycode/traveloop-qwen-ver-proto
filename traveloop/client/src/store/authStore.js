import { create } from 'zustand';
import { authAPI } from '../api';

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  
  login: async (credentials) => {
    const response = await authAPI.login(credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
    return response.data;
  },
  
  register: async (data) => {
    const response = await authAPI.register(data);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
    return response.data;
  },
  
  logout: () => {
    authAPI.logout().catch(() => {});
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  updateProfile: async (data) => {
    const response = await authAPI.updateProfile(data);
    const updatedUser = response.data;
    localStorage.setItem('user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
    return updatedUser;
  },
  
  fetchProfile: async () => {
    const response = await authAPI.getProfile();
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
    return user;
  },
}));

export default useAuthStore;

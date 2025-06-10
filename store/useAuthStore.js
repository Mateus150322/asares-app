// store/useAuthStore.js
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export const useAuthStore = create((set) => ({
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // chama somente no bootstrap do app
  initAuth: async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      set({ token, isAuthenticated: true });
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/login', { email, password });
      const token = res.data.token;
      await AsyncStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({ token, isAuthenticated: true, loading: false });
      return true;
    } catch (e) {
      set({ error: e?.response?.data?.message || e.message, loading: false });
      return false;
    }
  },

  logout: async () => {
    await api.post('/logout');
    await AsyncStorage.removeItem('token');
    set({ token: null, isAuthenticated: false });
  },
}));

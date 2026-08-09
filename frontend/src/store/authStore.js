import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.143.83.40:5001/api',
  withCredentials: true,
});

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  checkAuth: async () => {
    try {
      const res = await api.get('/auth/me');

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  login: async (identifier, password, rememberMe) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const res = await api.post('/auth/login', {
        identifier,
        password,
        rememberMe,
      });

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error('Login error:', error);

      set({
        error:
          error.response?.data?.message ||
          'Unable to connect to server',
        isLoading: false,
      });

      return {
        success: false,
        message:
          error.response?.data?.message ||
          'Unable to connect to server',
      };
    }
  },

  register: async (name, username, email, password) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      await api.post('/auth/register', {
        name,
        username,
        email,
        password,
      });

      set({
        isLoading: false,
        error: null,
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error('Registration error:', error);

      set({
        error:
          error.response?.data?.message ||
          'Unable to connect to server',
        isLoading: false,
      });

      return {
        success: false,
        message:
          error.response?.data?.message ||
          'Unable to connect to server',
      };
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');

      set({
        user: null,
        isAuthenticated: false,
        error: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
}));
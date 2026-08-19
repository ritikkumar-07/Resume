import { create } from 'zustand';
import axios from 'axios';

// const resolvedApiBase = import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:5001/api`;
const resolvedApiBase =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5001/api';

const api = axios.create({
  baseURL: resolvedApiBase,
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

  socialLogin: async (provider, payload) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const res = await api.post(`/auth/${provider}`, payload);

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
      console.error(`${provider} login error:`, error);

      const message =
        error.response?.data?.message ||
        `Unable to sign in with ${provider}`;

      set({
        error: message,
        isLoading: false,
      });

      return {
        success: false,
        message,
      };
    }
  },
}));
import { create } from 'zustand';
import axios from 'axios';

const resolvedApiBase =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5001/api';

const api = axios.create({
  baseURL: resolvedApiBase,
  withCredentials: true,
});

// Automatically attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
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
        error: null
      });

      return true;
    } catch (error) {
      localStorage.removeItem('accessToken');

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });

      return false;
    }
  },

  login: async (identifier, password, rememberMe) => {
    set({
      isLoading: true,
      error: null
    });

    try {
      const res = await api.post('/auth/login', {
        identifier,
        password,
        rememberMe
      });

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      return {
        success: true
      };
    } catch (error) {
      console.error('Login error:', error);

      const message =
        error.response?.data?.message ||
        'Unable to connect to server';

      set({
        error: message,
        isLoading: false
      });

      return {
        success: false,
        message
      };
    }
  },

  register: async (name, username, email, password) => {
    set({
      isLoading: true,
      error: null
    });

    try {
      await api.post('/auth/register', {
        name,
        username,
        email,
        password
      });

      set({
        isLoading: false,
        error: null
      });

      return {
        success: true
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Unable to connect to server';

      set({
        error: message,
        isLoading: false
      });

      return {
        success: false,
        message
      };
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }

    localStorage.removeItem('accessToken');

    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  },

  socialLogin: async (provider, payload) => {
    set({
      isLoading: true,
      error: null
    });

    try {
      const res = await api.post(
        `/auth/${provider}`,
        payload
      );

      // Save token if backend returns one
      if (res.data.accessToken) {
        localStorage.setItem(
          'accessToken',
          res.data.accessToken
        );
      }

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      return {
        success: true
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        `Unable to sign in with ${provider}`;

      set({
        error: message,
        isLoading: false
      });

      return {
        success: false,
        message
      };
    }
  },

  // New OAuth callback function
  completeOAuthLogin: async (token) => {
    try {
      localStorage.setItem('accessToken', token);

      const res = await api.get('/auth/me');

      set({
        user: res.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      return {
        success: true
      };
    } catch (error) {
      console.error('OAuth completion error:', error);

      localStorage.removeItem('accessToken');

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Authentication failed'
      });

      return {
        success: false
      };
    }
  }
}));

export { api };
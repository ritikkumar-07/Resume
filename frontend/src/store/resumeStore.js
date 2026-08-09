import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true
});

export const useResumeStore = create((set, get) => ({
  resumes: [],
  currentResume: null,
  isLoading: false,
  error: null,

  fetchResumes: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get('/resumes');
      set({ resumes: res.data.resumes, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load resumes', isLoading: false });
    }
  },

  fetchResume: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get(`/resumes/${id}`);
      set({ currentResume: res.data.resume, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load resume', isLoading: false });
    }
  },

  createResume: async (title, template) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post('/resumes', { title, template });
      set((state) => ({ resumes: [res.data.resume, ...state.resumes], isLoading: false }));
      return res.data.resume;
    } catch (error) {
      set({ error: 'Failed to create resume', isLoading: false });
      return null;
    }
  },

  updateResume: async (id, data) => {
    try {
      const res = await api.put(`/resumes/${id}`, data);
      set((state) => ({
        currentResume: res.data.resume,
        resumes: state.resumes.map((r) => r.id === id ? res.data.resume : r)
      }));
    } catch (error) {
      console.error('Update failed', error);
    }
  },

  deleteResume: async (id) => {
    try {
      await api.delete(`/resumes/${id}`);
      set((state) => ({
        resumes: state.resumes.filter((r) => r.id !== id)
      }));
    } catch (error) {
      console.error('Delete failed', error);
    }
  },

  duplicateResume: async (id) => {
    try {
      const res = await api.post(`/resumes/${id}/duplicate`);
      set((state) => ({
        resumes: [res.data.resume, ...state.resumes]
      }));
    } catch (error) {
      console.error('Duplicate failed', error);
    }
  }
}));

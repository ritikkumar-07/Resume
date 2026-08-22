import { create } from 'zustand';
import { api } from './authStore';

export const useResumeStore = create((set, get) => ({
  resumes: [],
  currentResume: null,
  isLoading: false,
  error: null,

  fetchResumes: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await api.get('/resumes');

      set({
        resumes: res.data.resumes,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('FETCH RESUMES ERROR:', error);
      console.error('Response:', error.response?.data);
      console.error('Status:', error.response?.status);

      set({
        error:
          error.response?.data?.message ||
          'Failed to load resumes',
        isLoading: false
      });
    }
  },

  fetchResume: async (id) => {
    set({
      isLoading: true,
      error: null
    });

    try {
      const res = await api.get(`/resumes/${id}`);

      set({
        currentResume: res.data.resume,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('FETCH RESUME ERROR:', error);

      set({
        error:
          error.response?.data?.message ||
          'Failed to load resume',
        isLoading: false
      });
    }
  },

  createResume: async (title, template) => {
    set({
      isLoading: true,
      error: null
    });

    try {
      console.log('Creating resume...');

      const res = await api.post('/resumes', {
        title,
        template
      });

      console.log(
        'Create Resume Response:',
        res.data
      );

      set((state) => ({
        resumes: [
          res.data.resume,
          ...state.resumes
        ],
        isLoading: false,
        error: null
      }));

      return res.data.resume;

    } catch (error) {
      console.error(
        'CREATE RESUME ERROR:',
        error
      );

      console.error(
        'Response:',
        error.response?.data
      );

      console.error(
        'Status:',
        error.response?.status
      );

      set({
        error:
          error.response?.data?.message ||
          'Failed to create resume',

        isLoading: false
      });

      return null;
    }
  },

  updateResume: async (id, data) => {
    try {
      const res = await api.put(
        `/resumes/${id}`,
        data
      );

      set((state) => ({
        currentResume: res.data.resume,

        resumes: state.resumes.map((resume) =>
          resume.id === id
            ? res.data.resume
            : resume
        )
      }));

      return res.data.resume;

    } catch (error) {
      console.error(
        'UPDATE RESUME ERROR:',
        error.response?.data || error
      );

      return null;
    }
  },

  deleteResume: async (id) => {
    try {
      await api.delete(`/resumes/${id}`);

      set((state) => ({
        resumes: state.resumes.filter(
          (resume) => resume.id !== id
        )
      }));

      return true;

    } catch (error) {
      console.error(
        'DELETE RESUME ERROR:',
        error.response?.data || error
      );

      return false;
    }
  },

  duplicateResume: async (id) => {
    try {
      const res = await api.post(
        `/resumes/${id}/duplicate`
      );

      set((state) => ({
        resumes: [
          res.data.resume,
          ...state.resumes
        ]
      }));

      return res.data.resume;

    } catch (error) {
      console.error(
        'DUPLICATE RESUME ERROR:',
        error.response?.data || error
      );

      return null;
    }
  }
}));
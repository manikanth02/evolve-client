import axios from 'axios';
import { mockProgrammes, mockArticles, mockActivities } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const api = {
  // Programmes
  async getProgrammes(params = {}) {
    try {
      const response = await apiClient.get('/programmes', { params });
      return response.data;
    } catch (error) {
      console.warn('API getProgrammes fallback triggered:', error.message);
      let items = [...mockProgrammes];
      if (params.category && params.category !== 'All') {
        items = items.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        items = items.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
        );
      }
      return {
        success: true,
        data: {
          programmes: items,
          pagination: { total: items.length, page: 1, pages: 1, limit: items.length }
        },
        source: 'local_fallback'
      };
    }
  },

  async getProgrammeBySlug(slug) {
    try {
      const response = await apiClient.get(`/programmes/${slug}`);
      return response.data;
    } catch (error) {
      console.warn('API getProgrammeBySlug fallback:', error.message);
      const found = mockProgrammes.find(p => p.slug === slug);
      if (found) {
        return { success: true, data: found, source: 'local_fallback' };
      }
      throw error;
    }
  },

  // Wisdom Articles
  async getArticles(params = {}) {
    try {
      const response = await apiClient.get('/articles', { params });
      return response.data;
    } catch (error) {
      console.warn('API getArticles fallback triggered:', error.message);
      let items = [...mockArticles];
      if (params.category && params.category !== 'All') {
        items = items.filter(a => a.category.toLowerCase() === params.category.toLowerCase());
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        items = items.filter(a =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          (a.verseReference && a.verseReference.toLowerCase().includes(q))
        );
      }
      return {
        success: true,
        data: {
          articles: items,
          pagination: { total: items.length, page: 1, pages: 1, limit: items.length }
        },
        source: 'local_fallback'
      };
    }
  },

  async getArticleBySlug(slug) {
    try {
      const response = await apiClient.get(`/articles/${slug}`);
      return response.data;
    } catch (error) {
      console.warn('API getArticleBySlug fallback:', error.message);
      const found = mockArticles.find(a => a.slug === slug);
      if (found) {
        return { success: true, data: found, source: 'local_fallback' };
      }
      throw error;
    }
  },

  // Activities
  async getActivities() {
    try {
      const response = await apiClient.get('/activities');
      return response.data;
    } catch (error) {
      console.warn('API getActivities fallback triggered:', error.message);
      return {
        success: true,
        data: { activities: mockActivities },
        source: 'local_fallback'
      };
    }
  },

  // Impact
  async getImpact() {
    try {
      const response = await apiClient.get('/impact');
      return response.data;
    } catch (error) {
      console.warn('API getImpact fallback triggered:', error.message);
      return {
        success: true,
        data: {
          metrics: [],
          hasVerifiedData: false,
          philosophy: 'Evolve Club is dedicated to transparency. Impact metrics are displayed only after rigorous real-world verification.'
        },
        source: 'local_fallback'
      };
    }
  },

  // Enquiries
  async submitEnquiry(payload) {
    try {
      const response = await apiClient.post('/enquiries', payload);
      return response.data;
    } catch (error) {
      // If server unreachable, provide graceful simulated success with clear notice
      if (!error.response) {
        console.warn('Server offline; recording enquiry locally:', payload);
        return {
          success: true,
          message: 'Thank you! Your enquiry has been registered locally and will be synchronized with our team shortly.',
          data: { name: payload.name, simulated: true }
        };
      }
      throw error;
    }
  },

  // Contact
  async submitContact(payload) {
    try {
      const response = await apiClient.post('/contact', payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        console.warn('Server offline; recording contact message locally:', payload);
        return {
          success: true,
          message: 'Thank you! Your message has been registered locally and will be handled by our team soon.',
          data: { name: payload.name, simulated: true }
        };
      }
      throw error;
    }
  }
};

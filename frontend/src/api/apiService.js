// src/api/apiService.js
import axios from 'axios';
import apiConfig from './config';

const api = axios.create({
  baseURL: apiConfig.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for auth tokens
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (credentials) => api.post(apiConfig.login, credentials),
  register: (userData) => api.post(apiConfig.register, userData)
};

export const appointmentService = {
  create: (data) => api.post(apiConfig.appointments, data),
  getAll: () => api.get(apiConfig.appointments)
};
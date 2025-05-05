// src/api/config.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com' 
  : 'http://localhost:5000';

export default {
  // Auth endpoints
  login: `${API_BASE_URL}/api/auth/login`,
  register: `${API_BASE_URL}/api/auth/register`,
  
  // Appointment endpoints
  appointments: `${API_BASE_URL}/api/appointments`,
  
  // Other endpoints...
};
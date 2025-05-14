import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include JWT token in headers
api.interceptors.request.use(
  (config) => {
    // Get token from Redux store
    const token = store.getState().auth.token;
    
    // If token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = token;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (expired token)
    if (error.response && error.response.status === 401) {
      // Dispatch logout action to clear token and redirect to login
      store.dispatch(logout());
    }
    
    return Promise.reject(error);
  }
);

export default api;

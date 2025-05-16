import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';
import { getTokenCookie } from './cookies';

// Determine the API base URL based on environment
const API_BASE_URL = import.meta.env.PROD
  ? 'https://ecommerce-follow-along-backend.vercel.app' // Your deployed backend URL
  : 'http://localhost:8080';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Enable sending cookies with requests
  withCredentials: true,
});

// Add request interceptor to include JWT token in headers if needed
// Note: With HTTP-only cookies, the server will automatically get the token from cookies
// This is a fallback in case the server expects the token in Authorization header
api.interceptors.request.use(
  (config) => {
    // Get token from cookie
    const token = getTokenCookie();

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

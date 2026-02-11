import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // Important for cookies (JWT)
  headers: {
    'Content-Type': 'application/json'
  }
});

// Optional: Interceptor to handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
      // Token invalid or expired - clear flag and redirect
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;

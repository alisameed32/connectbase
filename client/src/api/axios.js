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
    if (error.response && error.response.status === 403) {
      // Token invalid or expired - redirect to login
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;

import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Limpiar el token del almacenamiento local si existe
      localStorage.removeItem('token');
      // No redirigimos aquí, dejamos que la aplicación maneje la redirección
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Configurar el token de autenticación al iniciar la aplicación
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

export const login = async (email, password) => {
  const response = await api.post('/users/login', { email, password });
  if (response.data.token) {
    setAuthToken(response.data.token);
  }
  return response;
};

export const logout = async () => {
  const response = await api.post('/users/logout');
  setAuthToken(null);
  return response;
};

export const getCurrentUser = async () => {
  return api.get('/users/current');
};

export const register = async (userData) => {
  return api.post('/users/register', userData);
};

export default api;
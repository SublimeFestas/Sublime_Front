import axios from "axios";
import UserLogin from "@/services/userAuthService.js";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const api = axios.create({
  timeout: 100000,
});

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptador de respostas e verificador de token
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Resposta bem-sucedida:', response.data);
    return response;
  },
  async (error) => {
    console.error('Erro no interceptor:', error);
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const { data } = await axiosInstance.post('token/refresh/', {
          refresh: refreshToken,
        });
        localStorage.setItem('access_token', data.results.access);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.results.access}`;
        originalRequest.headers['Authorization'] = `Bearer ${data.results.access}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete axiosInstance.defaults.headers.common['Authorization'];
        window.location.href = '/plataform/auth/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;


import axios from "axios";

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor para logs detalhados
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Fazendo requisição ${config.method?.toUpperCase()} para: ${config.baseURL}${config.url}`);
    console.log('📦 Dados enviados:', config.data);
    console.log('🔧 Headers antes do token:', config.headers);
    
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      console.log('🔑 Token adicionado ao header');
    } else {
      console.warn('⚠️ Nenhum token encontrado!');
    }
    
    console.log('🔧 Headers finais:', config.headers);
    return config;
  },
  (error) => {
    console.error('❌ Erro no request interceptor:', error);
    return Promise.reject(error);
  }
);

// Response interceptor para logs e refresh token
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Resposta ${response.status} de ${response.config.method?.toUpperCase()} ${response.config.url}:`, response.data);
    return response;
  },
  async (error) => {
    console.error(`❌ Erro ${error.response?.status} na requisição:`, {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('🔄 Tentando renovar token...');

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('Refresh token não encontrado');
        }
        
        const { data } = await api.post('token/refresh/', {
          refresh: refreshToken,
        });
        
        const newAccessToken = data.results?.access || data.access;
        localStorage.setItem('access_token', newAccessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        console.log('✅ Token renovado com sucesso!');
        return api(originalRequest);
      } catch (refreshError) {
        console.error('❌ Erro ao renovar token:', refreshError);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete api.defaults.headers.common['Authorization'];
        window.location.href = '/plataform/auth/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;


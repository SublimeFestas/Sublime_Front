import axios from "axios";
// import { useAuth } from "@/stores/auth";
// import { globalRouter } from "./globalRouter";

const api = axios.create({
  // baseURL: 'http://localhost:8000/api',
  baseURL: 'https://sublime-back.onrender.com/api',
  timeout: 100000,
});

export default api;



// Pós Autenticação
// api.interceptors.request.use((config) => {
//  const authStore = useAuth();
//  const token = authStore?.token;
//  if (token) {
//    config.headers.Authorization = `Bearer ${token}`;
//  }
//  return config;
// });
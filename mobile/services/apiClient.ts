import axios from 'axios';
import authStorage from '../utils/authStorage'; 

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
});


apiClient.interceptors.request.use(async (config) => {
  
  const token = await authStorage.getToken(); 

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


apiClient.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  if (error.response && error.response.status === 401) {
    
    console.log('Unauthorized, logging out...');
    
    await authStorage.removeToken(); 
    
  }
  return Promise.reject(error);
});

export default apiClient;
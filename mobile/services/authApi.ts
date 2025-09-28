import apiClient from './apiClient';
import { AxiosResponse } from 'axios';
interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}
interface SignUpResponse {
  message: string;
  
}

interface AuthPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  token: string; 
  user?: { id: string; name: string; email: string };
}


const signUp = (payload: SignUpPayload): Promise<AxiosResponse<AuthResponse>> => {
  return apiClient.post('/auth/signup', payload);
};

const login = (payload: AuthPayload): Promise<AxiosResponse<AuthResponse>> => {
  return apiClient.post('/auth/login', payload);
};


export default {
  signUp,
  login,
};



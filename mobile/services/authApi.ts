import apiClient from './apiClient';
import { AxiosResponse } from 'axios';


interface AuthPayload {
  email: string;
  password: string;
}

interface SignUpPayload extends AuthPayload {
  name: string;
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
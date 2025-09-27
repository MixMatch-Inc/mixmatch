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

const signUp = (payload: SignUpPayload): Promise<AxiosResponse<SignUpResponse>> => {
  return apiClient.post('/auth/signup', payload);
};

export default {
  signUp,
};
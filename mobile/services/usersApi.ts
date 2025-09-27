import apiClient from './apiClient';

interface User {
  id: string;
  name: string;
  email: string;
}

const getUsers = () => apiClient.get('/users');

const getUserById = (id: number) => apiClient.get(`/users/${id}`);

const getMe = () => apiClient.get<User>('/users/me');

export default {
  getUsers,
  getUserById,
  getMe,
};
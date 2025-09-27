import apiClient from './apiClient';

const getUsers = () => apiClient.get('/users');

const getUserById = (id: number) => apiClient.get(`/users/${id}`);

export default {
  getUsers,
  getUserById,
};
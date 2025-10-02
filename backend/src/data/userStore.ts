import { User } from '../types';

// Simple in-memory user store for demonstration
const users: User[] = [
  {
    _id: '507f1f77bcf86cd799439011',
    email: 'john.doe@example.com',
    name: 'John Doe'
  },
  {
    _id: '507f1f77bcf86cd799439012',
    email: 'jane.smith@example.com',
    name: 'Jane Smith'
  },
  {
    _id: '507f1f77bcf86cd799439013',
    email: 'admin@example.com',
    name: 'Admin User'
  }
];

export const getUserById = (userId: string): User | undefined => {
  return users.find(user => user._id === userId);
};

export const getUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

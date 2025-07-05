import axios from './axios';

// Login API call
export const login = async (credentials) => {
  const response = await axios.post('/api/login/', credentials);
  return response.data;
};

// Register API call
export const register = async (userData) => {
  const response = await axios.post('/api/register/', userData);
  return response.data;
};

import axiosInstance from './axios';

export const getTasks = () => axiosInstance.get('/tasks/');
export const getTask = (id) => axiosInstance.get(`/tasks/${id}/`);
export const createTask = (data) => axiosInstance.post('/tasks/', data);
export const updateTask = (id, data) => axiosInstance.put(`/tasks/${id}/`, data);
export const deleteTask = (id) => axiosInstance.delete(`/tasks/${id}/`);
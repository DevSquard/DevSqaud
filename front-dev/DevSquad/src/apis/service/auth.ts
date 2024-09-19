import api from '../api';

export const authAPI = {
  login: (data: { email: string, password: string }) => api.post("/auth/login", data)
};
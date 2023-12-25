// authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your backend API URL

const authService = {
  register: async (username, password) => {
    return axios.post(`${API_URL}/signup`, { username, password });
  },

  login: async (username, password) => {
    return axios.post(`${API_URL}/login`, { username, password });
  },
};

export default authService;

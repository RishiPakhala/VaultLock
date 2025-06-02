// src/utils/api.js

const API_BASE_URL = 'http://localhost:5000/api'; // Change this if your backend URL is different

const API = {
  register: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return res.json();
  },

  login: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return res.json();
  },

  getVault: async (token) => {
    const res = await fetch(`${API_BASE_URL}/vault`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  },

  addPassword: async (passwordData, token) => {
    const res = await fetch(`${API_BASE_URL}/vault`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });
    return res.json();
  },
};

export default API;

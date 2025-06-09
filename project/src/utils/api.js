// utils/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('vaultToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// API Functions

export const getPasswords = async () => {
  const res = await API.get('/vault');
  return res.data;
};

export const createPassword = async (data) => {
  const res = await API.post('/vault', data);
  return res.data;
};

export const updatePassword = async (id, data) => {
  const res = await API.put(`/vault/${id}`, data);
  return res.data;
};

export const deletePassword = async (id) => {
  const res = await API.delete(`/vault/${id}`);
  return res.data;
};

export const addPassword = async (req, res) => {
  try {
    console.log("addPassword called", req.user, req.body);

    const { website, username, password, notes } = req.body;
    const encryptedPassword = encrypt(password);

    const newEntry = new Password({
      user: req.user.userId, // Make sure this is correct!
      website,
      username,
      password: encryptedPassword,
      notes,
    });

    await newEntry.save();
    res.status(201).json({ message: 'Password saved successfully' });
  } catch (err) {
    console.error("Error in addPassword:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

export default API;

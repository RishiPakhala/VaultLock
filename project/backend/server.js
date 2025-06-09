import dotenv from 'dotenv';
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// Load env variables


import authRoutes from './routes/authRoutes.js';
import vaultRoutes from './routes/vaultRoutes.js';

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // your Vite frontend
  credentials: true // allow sending cookies or auth headers
}));
// Allow frontend to talk to backend
app.use(express.json()); // Parse incoming JSON requests
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vault', vaultRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

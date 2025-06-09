import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VaultPage from './pages/VaultPage';
import SettingsPage from './pages/SettingsPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import NotFoundPage from './pages/NotFoundPage';

// Providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/vault" element={<VaultPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

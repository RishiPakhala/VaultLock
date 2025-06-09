import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import API from '../utils/api'; // ✅ Import your Axios instance

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { isDarkMode, setThemeForLogin } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }
    try {
      setIsLoading(true);
      setError('');
      await login(email, password);
      setThemeForLogin(); // Restore user's last theme
      navigate('/'); // Navigate to home page after successful login
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-14rem)] flex-col items-center justify-center py-12 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Lock className="mx-auto h-12 w-12 text-blue-800 dark:text-white" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Create one
            </Link>
          </p>
        </div>
        <div className="mt-8">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4 dark:bg-red-900/50">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 dark:text-red-300" />
                <div className="ml-3 text-sm text-red-700 dark:text-red-200">{error}</div>
              </div>
            </div>
          )}
          <div className="card dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6 p-8" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>
              <button type="submit" className="btn btn-primary w-full py-2 dark:bg-blue-700 dark:hover:bg-blue-600" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

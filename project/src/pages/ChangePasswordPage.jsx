import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Lock, AlertCircle } from 'lucide-react';

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { changePassword } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      await changePassword(currentPassword, newPassword);
      setSuccess('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Error changing password:', err);
      setError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-8">
          <Lock className="mx-auto h-12 w-12 text-blue-800 dark:text-white" />
          <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Change Master Password
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Update your master password to keep your vault secure
          </p>
        </div>

        <div className="card dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6">
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-4 dark:bg-red-900/50">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400 dark:text-red-300" />
                  <div className="ml-3 text-sm text-red-700 dark:text-red-200">{error}</div>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-md bg-green-50 p-4 dark:bg-green-900/50">
                <div className="flex">
                  <div className="ml-3 text-sm text-green-700 dark:text-green-200">{success}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-white">
                  Current Password
                </label>
                <input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-white">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-white">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigate('/settings')}
                  className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50"
                >
                  {isLoading ? 'Changing Password...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;

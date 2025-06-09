import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Moon, Sun, Shield, Download, AlertTriangle, Trash2, LogOut, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const SettingsPage = () => {
  const { user, logout, deleteAccount } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleExportData = () => {
    alert('Data export feature would be implemented here');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        setIsDeleting(true);
        await deleteAccount();
        navigate('/login');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
      
      <div className="space-y-6">
        {/* Theme Preferences */}
        <div className="card dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Theme Preferences</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isDarkMode ? (
                  <Moon className="h-5 w-5 text-white" />
                ) : (
                  <Sun className="h-5 w-5 text-gray-600" />
                )}
                <span className="text-gray-700 dark:text-white">
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
              </div>
              <button
                onClick={toggleTheme}
                className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="card dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Account Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-600 dark:text-white" />
                  <span className="text-gray-700 dark:text-white">Account Information</span>
                </div>
                <button
                  onClick={() => navigate('/profile')}
                  className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                >
                  View Profile
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Lock className="h-5 w-5 text-gray-600 dark:text-white" />
                  <span className="text-gray-700 dark:text-white">Security Settings</span>
                </div>
                <button
                  onClick={() => navigate('/security')}
                  className="rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Manage Security
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card dark:bg-red-900/20 dark:border-red-900">
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-red-800 dark:text-white">Danger Zone</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <LogOut className="h-5 w-5 text-red-600 dark:text-white" />
                  <span className="text-red-700 dark:text-white">Logout</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 dark:bg-red-800 dark:text-white dark:hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Trash2 className="h-5 w-5 text-red-600 dark:text-white" />
                  <span className="text-red-700 dark:text-white">Delete Account</span>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 dark:bg-red-800 dark:text-white dark:hover:bg-red-700 disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Account'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

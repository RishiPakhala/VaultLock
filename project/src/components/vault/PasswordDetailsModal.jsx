import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const PasswordDetailsModal = ({ isOpen, onClose, password, onUpdate, onDelete }) => {
  const { isDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editedPassword, setEditedPassword] = useState(password);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleUpdate = () => {
    onUpdate(editedPassword);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this password?')) {
      onDelete();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 w-full max-w-md`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Password Details
          </h2>
          <button
            onClick={onClose}
            className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            ✕
          </button>
        </div>

        {isEditing ? (
          // Edit Form
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Website
              </label>
              <input
                type="text"
                value={editedPassword.website}
                onChange={(e) => setEditedPassword({ ...editedPassword, website: e.target.value })}
                className={`mt-1 block w-full rounded-md ${
                  isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'
                } border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Username
              </label>
              <input
                type="text"
                value={editedPassword.username}
                onChange={(e) => setEditedPassword({ ...editedPassword, username: e.target.value })}
                className={`mt-1 block w-full rounded-md ${
                  isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'
                } border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={editedPassword.password}
                  onChange={(e) => setEditedPassword({ ...editedPassword, password: e.target.value })}
                  className={`mt-1 block w-full rounded-md ${
                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'
                  } border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Notes
              </label>
              <textarea
                value={editedPassword.notes}
                onChange={(e) => setEditedPassword({ ...editedPassword, notes: e.target.value })}
                className={`mt-1 block w-full rounded-md ${
                  isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'
                } border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                rows="3"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className={`px-4 py-2 rounded-md ${
                  isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          // View Details
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Website
              </label>
              <p className={`mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{password.website}</p>
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Username
              </label>
              <p className={`mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{password.username}</p>
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="flex items-center mt-1">
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {showPassword ? password.password : '••••••••'}
                </p>
                <button
                  onClick={togglePasswordVisibility}
                  className={`ml-2 p-1 rounded-full hover:bg-gray-200 ${
                    isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {password.notes && (
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Notes
                </label>
                <p className={`mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{password.notes}</p>
              </div>
            )}
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordDetailsModal; 
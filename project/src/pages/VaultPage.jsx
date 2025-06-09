import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getPasswords, createPassword, updatePassword, deletePassword } from '../utils/api';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import SummaryCards from '../components/dashboard/SummaryCards';
import SearchFilterBar from '../components/dashboard/SearchFilterBar';
import QuickActionsBar from '../components/dashboard/QuickActionsBar';
import SecurityStatus from '../components/dashboard/SecurityStatus';
import PasswordModal from '../components/vault/PasswordModal';
import PasswordDetailsModal from '../components/vault/PasswordDetailsModal';

const VaultPage = () => {
  const [passwords, setPasswords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(new Date());
  const [preFilledPassword, setPreFilledPassword] = useState(null);

  const { user, logout } = useAuth();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchPasswordsList();
  }, []);

  const fetchPasswordsList = async () => {
    try {
      setIsLoading(true);
      const data = await getPasswords();
      setPasswords(data);
      setError('');
    } catch (err) {
      setError('Failed to load passwords. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPassword = async (passwordData) => {
    try {
      await createPassword(passwordData);
      await fetchPasswordsList();
      setNotification({ type: 'success', message: 'Password added successfully' });
      setIsModalOpen(false);
      setPreFilledPassword(null);
    } catch (err) {
      setError('Failed to add password. Please try again.');
    }
  };

  const handleUpdatePassword = async (id, updatedData) => {
    try {
      await updatePassword(id, updatedData);
      await fetchPasswordsList();
      setNotification({ type: 'success', message: 'Password updated successfully' });
      setIsDetailsModalOpen(false);
    } catch (err) {
      setError('Failed to update password. Please try again.');
    }
  };

  const handleDeletePassword = async (id) => {
    try {
      await deletePassword(id);
      await fetchPasswordsList();
      setNotification({ type: 'success', message: 'Password deleted successfully' });
      setIsDetailsModalOpen(false);
    } catch (err) {
      setError('Failed to delete password. Please try again.');
    }
  };

  const handlePasswordClick = (password) => {
    setSelectedPassword(password);
    setIsDetailsModalOpen(true);
  };

  const handleOpenAddModal = (preFilled = null) => {
    setPreFilledPassword(preFilled);
    setIsModalOpen(true);
  };

  // Filtered and searched passwords
  const filteredPasswords = passwords.filter((password) => {
    const matchesSearch =
      password.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
      password.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || password.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <WelcomeBanner user={user} passwordCount={passwords.length} />
        <div className="mt-8">
          <SummaryCards passwords={passwords} sessionStartTime={sessionStartTime} />
        </div>
        <div className="mt-8">
          <QuickActionsBar onAdd={handleOpenAddModal} />
        </div>
        <div className="mt-8">
          <SearchFilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            passwords={passwords}
          />
        </div>
        
        {/* Saved Passwords List */}
        <div id="saved-passwords-section" className="mt-8">
          <div id="recently-added-section"></div>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Saved Passwords
          </h2>
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="grid gap-4">
              {filteredPasswords.map((password) => (
                <div
                  key={password._id}
                  onClick={() => handlePasswordClick(password)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors duration-200
                    ${isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-gray-100'
                    } shadow-md`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {password.website}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {password.username}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(password.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8">
          <SecurityStatus passwords={passwords} />
        </div>
      </div>

      {/* Add Password Modal */}
      <PasswordModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPreFilledPassword(null);
        }}
        onSave={handleAddPassword}
        preFilledPassword={preFilledPassword}
      />

      {/* Password Details Modal */}
      {selectedPassword && (
        <PasswordDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedPassword(null);
          }}
          password={selectedPassword}
          onUpdate={(updatedData) => handleUpdatePassword(selectedPassword._id, updatedData)}
          onDelete={() => handleDeletePassword(selectedPassword._id)}
        />
      )}
    </div>
  );
};

export default VaultPage;

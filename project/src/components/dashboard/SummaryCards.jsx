import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Key, ShieldCheck } from 'lucide-react';

const SummaryCards = ({ passwords, sessionStartTime }) => {
  const { isDarkMode } = useTheme();
  const [showStrengthDetails, setShowStrengthDetails] = useState(false);

  const scrollToSavedPasswords = () => {
    const savedPasswordsSection = document.getElementById('saved-passwords-section');
    if (savedPasswordsSection) {
      savedPasswordsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRecentlyAdded = () => {
    const recentlyAddedSection = document.getElementById('recently-added-section');
    if (recentlyAddedSection) {
      recentlyAddedSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const weakPasswords = passwords.filter(p => getPasswordStrength(p.password) < 3);
  const strongPasswords = passwords.filter(p => getPasswordStrength(p.password) >= 3);

  const recentlyAddedPasswords = passwords.filter(p => new Date(p.createdAt) > sessionStartTime);

  const toggleStrengthDetails = () => {
    setShowStrengthDetails(!showStrengthDetails);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Passwords Card */}
        <div
          onClick={scrollToSavedPasswords}
          className={`p-6 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex items-center mb-2">
            <Key className={`h-6 w-6 mr-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Total Passwords
            </h3>
          </div>
          <p className={`text-3xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {passwords.length}
          </p>
        </div>

        {/* Password Strength Card */}
        <div className="relative">
          <div 
            onClick={toggleStrengthDetails}
            className={`p-6 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 relative ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex items-center mb-2">
              <ShieldCheck className={`h-6 w-6 mr-3 ${weakPasswords.length > 0 ? 'text-red-500' : 'text-green-500'}`} />
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Password Strength
              </h3>
            </div>
            <div className="space-y-2">
              <p className={`text-3xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                {weakPasswords.length} Weak
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {strongPasswords.length} Strong
              </p>
            </div>

            {/* Strength Details Popup */}
            {showStrengthDetails && (
              <div className={`absolute mt-2 p-4 rounded-lg shadow-lg z-50 w-80 ${
                isDarkMode ? 'bg-gray-700' : 'bg-white'
              }`}>
                <div className="mb-4">
                  <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Weak Passwords ({weakPasswords.length})
                  </h4>
                  <div className="space-y-2">
                    {weakPasswords.map((pwd, index) => (
                      <div key={index} className={`p-2 rounded ${
                        isDarkMode ? 'bg-gray-600' : 'bg-gray-100'
                      }`}>
                        <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {pwd.website}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {pwd.username}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Strong Passwords ({strongPasswords.length})
                  </h4>
                  <div className="space-y-2">
                    {strongPasswords.map((pwd, index) => (
                      <div key={index} className={`p-2 rounded ${
                        isDarkMode ? 'bg-gray-600' : 'bg-gray-100'
                      }`}>
                        <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                          {pwd.website}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {pwd.username}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recently Added Card */}
        <div
          onClick={scrollToRecentlyAdded}
          className={`p-6 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Recently Added
          </h3>
          <p className={`text-3xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            {recentlyAddedPasswords.length}
          </p>
        </div>
      </div>
      {showStrengthDetails && <div style={{ height: '340px' }}></div>}
    </>
  );
};

export default SummaryCards; 
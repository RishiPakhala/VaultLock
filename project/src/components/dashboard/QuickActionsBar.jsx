import React, { useState } from 'react';
import { Plus, Shield, Download, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function generateStrongPassword() {
  const length = 16;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
  password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
  password += "0123456789"[Math.floor(Math.random() * 10)];
  password += "!@#$%^&*()_+~`|}{[]:;?><,./-="[Math.floor(Math.random() * 32)];
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

const QuickActionsBar = ({ onAdd }) => {
  const [showModal, setShowModal] = useState(false);
  const [generatedPasswords, setGeneratedPasswords] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const navigate = useNavigate();

  const handleGenerateClick = () => {
    setShowModal(true);
    setGeneratedPasswords([generateStrongPassword(), generateStrongPassword(), generateStrongPassword()]);
  };

  const handleGenerateNew = () => {
    setGeneratedPasswords([generateStrongPassword(), generateStrongPassword(), generateStrongPassword()]);
  };

  const handlePasswordClick = (password) => {
    setSelectedPassword(password);
    setShowConfirmDialog(true);
  };

  const handleConfirmPassword = () => {
    setShowConfirmDialog(false);
    setShowModal(false);
    onAdd(selectedPassword);
  };

  const handleCopy = (password, idx) => {
    navigator.clipboard.writeText(password);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          <Plus className="h-4 w-4" /> Add New Password
        </button>
        <button
          onClick={handleGenerateClick}
          className="flex items-center gap-2 rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-purple-600 dark:hover:bg-purple-500"
        >
          <Shield className="h-4 w-4" /> Generate Secure Password
        </button>
        <button
          className="flex items-center gap-2 rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <Download className="h-4 w-4" /> Backup Vault
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Generated Passwords</h2>
            <div className="space-y-3 mb-4">
              {generatedPasswords.map((password, idx) => (
                <div
                  key={idx}
                  onClick={() => handlePasswordClick(password)}
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex justify-between items-center"
                >
                  <span className="font-mono text-gray-800 dark:text-gray-200 select-none">{password}</span>
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); handleCopy(password, idx); }}
                    className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    title="Copy password"
                  >
                    <Copy className={`h-5 w-5 ${copiedIndex === idx ? 'text-green-500' : 'text-gray-500 dark:text-gray-300'}`} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleGenerateNew}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                Generate Other 3 Passwords
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Use this password?
            </h3>
            <p className="font-mono bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 text-gray-800 dark:text-gray-200">
              {selectedPassword}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPassword}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Use Password
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActionsBar; 
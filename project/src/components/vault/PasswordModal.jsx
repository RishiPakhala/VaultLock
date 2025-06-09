import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Copy, RefreshCw, Check } from 'lucide-react';

const PasswordModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEditing = false,
  preFilledPassword,
}) => {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialData) {
      setWebsite(initialData.website);
      setUsername(initialData.username);
      setPassword(initialData.password);
      setNotes(initialData.notes || '');
    } else {
      setWebsite('');
      setUsername('');
      setPassword('');
      setNotes('');
    }
  }, [initialData, isOpen]);

  useEffect(() => {
    if (preFilledPassword) {
      setPassword(preFilledPassword);
    }
  }, [preFilledPassword]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const generatePassword = () => {
    const length = 16;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+={}[]|:;<>,.?/';
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!website || !username || !password) return;

    const entry = {
      website,
      username,
      password,
      notes: notes || '',
    };

    onSave(entry);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative w-full max-w-md animate-slide-up">
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
            <h3 className="text-lg font-medium text-gray-900">
              {isEditing ? 'Edit Password' : 'Add New Password'}
            </h3>
            <button
              type="button"
              className="rounded-md bg-white p-1 text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid gap-4">
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Website or App
                </label>
                <input
                  type="text"
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  required
                  className="form-input mt-1"
                  placeholder="example.com"
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username or Email
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-input mt-1"
                  placeholder="your.name@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input pr-24"
                  />
                  <div className="absolute inset-y-0 right-0 flex">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="inline-flex items-center px-2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={copyPassword}
                      className="inline-flex items-center px-2 text-gray-500 hover:text-gray-700"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="inline-flex items-center text-xs font-medium text-blue-800"
                  >
                    <RefreshCw className="mr-1 h-3 w-3" />
                    Generate Strong Password
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="form-input mt-1"
                  placeholder="Additional information..."
                ></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button type="button" onClick={onClose} className="btn btn-outline">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {isEditing ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;

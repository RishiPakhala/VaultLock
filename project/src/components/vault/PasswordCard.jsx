import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Edit, Trash, Clock, Check } from 'lucide-react';

const PasswordCard = ({ entry, onEdit, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(entry.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(entry.id);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <div className="card overflow-hidden transition-all hover:translate-y-[-2px]">
      <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="font-medium text-gray-900 truncate">{entry.website}</div>
          <div className="flex space-x-1">
            <button
              onClick={() => onEdit(entry)}
              className="rounded p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
              title="Edit"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className={`rounded p-1 ${
                showDeleteConfirm
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
              }`}
              title={showDeleteConfirm ? 'Confirm delete' : 'Delete'}
            >
              <Trash className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-3">
          <div className="text-xs font-medium uppercase text-gray-500">Username</div>
          <div className="mt-1 flex items-center justify-between">
            <div className="truncate text-sm">{entry.username}</div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(entry.username);
              }}
              className="ml-2 rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              title="Copy username"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mb-3">
          <div className="text-xs font-medium uppercase text-gray-500">Password</div>
          <div className="mt-1 flex items-center justify-between">
            <div className="truncate text-sm">
              {showPassword ? entry.password : '•'.repeat(Math.min(12, entry.password.length))}
            </div>
            <div className="ml-2 flex">
              <button
                onClick={togglePasswordVisibility}
                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <button
                onClick={copyPassword}
                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                title="Copy password"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
        {entry.notes && (
          <div className="mb-3">
            <div className="text-xs font-medium uppercase text-gray-500">Notes</div>
            <div className="mt-1 text-sm text-gray-700">{entry.notes}</div>
          </div>
        )}
        <div className="flex items-center justify-end text-xs text-gray-500">
          <Clock className="mr-1 h-3 w-3" />
          <span>Updated {formatDate(entry.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordCard;

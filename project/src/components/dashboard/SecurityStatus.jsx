import React from 'react';
import { ShieldCheck } from 'lucide-react';

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score >= 4 ? 'Strong' : 'Weak';
}

const SecurityStatus = ({ passwords }) => {
  const strong = passwords.filter(p => getPasswordStrength(p.password || '') === 'Strong').length;
  const percent = passwords.length ? Math.round((strong / passwords.length) * 100) : 0;
  return (
    <div className="card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 text-green-500 dark:text-green-400" />
        <span className="font-medium text-gray-900 dark:text-white">Your data is protected with AES-256 encryption.</span>
      </div>
      <div className="w-full sm:w-1/3 mt-4 sm:mt-0">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500 dark:text-gray-400">Password Health</span>
          <span className="text-gray-700 dark:text-gray-200">{percent}% Strong</span>
        </div>
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 dark:bg-green-400"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SecurityStatus; 
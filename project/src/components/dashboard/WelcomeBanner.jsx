import React from 'react';

const WelcomeBanner = ({ user, passwordCount }) => (
  <div className="rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 p-6 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 className="text-2xl font-bold text-white">Welcome back, {user?.fullName || 'User'} <span role="img" aria-label="wave">👋</span></h2>
      <p className="mt-1 text-blue-100 text-sm">You have <span className="font-semibold">{passwordCount}</span> passwords securely stored.</p>
    </div>
  </div>
);

export default WelcomeBanner; 
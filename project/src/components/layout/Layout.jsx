import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useTheme } from '../../context/ThemeContext';

const Layout = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

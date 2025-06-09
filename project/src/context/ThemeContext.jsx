import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, _setIsDarkMode] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Then check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  // Track if we should skip saving to localStorage
  const skipStorageRef = useRef(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
      if (!skipStorageRef.current) {
        localStorage.setItem('theme', 'dark');
        localStorage.setItem('lastUserTheme', 'dark');
      }
    } else {
      htmlElement.classList.remove('dark');
      if (!skipStorageRef.current) {
        localStorage.setItem('theme', 'light');
        localStorage.setItem('lastUserTheme', 'light');
      }
    }
    // Reset skipStorage after each effect
    skipStorageRef.current = false;
  }, [isDarkMode]);

  // setIsDarkMode with skipStorage option
  const setIsDarkMode = (value, options = {}) => {
    if (options.skipStorage) {
      skipStorageRef.current = true;
      // Only update 'theme', not 'lastUserTheme'
      localStorage.setItem('theme', value ? 'dark' : 'light');
    }
    _setIsDarkMode(value);
  };

  // Call this on login to restore user's last theme
  const setThemeForLogin = () => {
    const lastUserTheme = localStorage.getItem('lastUserTheme');
    if (lastUserTheme === 'dark') {
      _setIsDarkMode(true);
    } else {
      _setIsDarkMode(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setIsDarkMode, setThemeForLogin }}>
      <div className={isDarkMode ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}; 
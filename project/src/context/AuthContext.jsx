import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('vaultToken');
    const storedUser = localStorage.getItem('vaultlock_user');
    const lastInteractionTime = localStorage.getItem('lastInteractionTime');
    const currentTime = new Date().getTime();

    if (token && storedUser) {
      try {
        if (lastInteractionTime) {
          const timeDiff = currentTime - parseInt(lastInteractionTime);
          if (timeDiff > 5 * 60 * 1000) { // 5 minutes
            logout();
          } else {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
          }
        } else {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('vaultlock_user');
        localStorage.removeItem('vaultToken');
        localStorage.removeItem('lastInteractionTime');
      }
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const updateLastInteractionTime = useCallback(() => {
    localStorage.setItem('lastInteractionTime', new Date().getTime().toString());
  }, []);

  const login = async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('vaultToken', token);
      localStorage.setItem('vaultlock_user', JSON.stringify(user));
      updateLastInteractionTime();

      setUser(user);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (fullName, email, password) => {
    try {
      const response = await API.post('/auth/register', { fullName, email, password });
      updateLastInteractionTime();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('vaultlock_user');
    localStorage.removeItem('vaultToken');
    localStorage.removeItem('lastInteractionTime');
  }, []);

  useEffect(() => {
    let animationFrameId;
    let lastCheck = Date.now();

    const checkAndUpdate = () => {
      const now = Date.now();
      if (now - lastCheck >= 1000) { // Check every second
        if (document.hasFocus()) {
          updateLastInteractionTime();
          checkAuth();
        }
        lastCheck = now;
      }
      animationFrameId = requestAnimationFrame(checkAndUpdate);
    };

    const handleFocus = () => {
      updateLastInteractionTime();
      checkAuth();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateLastInteractionTime();
        checkAuth();
      }
    };

    // Start the animation frame loop
    animationFrameId = requestAnimationFrame(checkAndUpdate);

    // Add event listeners
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [checkAuth, updateLastInteractionTime]);

  const value = {
    user,
    isAuthenticated,
    error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

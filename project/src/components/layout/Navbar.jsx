import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Lock, Menu, X, User, LogOut, Settings, Vault, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isAuthenticated, user, logout } = useAuth();
  const { isDarkMode, setIsDarkMode } = useTheme();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    setIsDarkMode(false);
    logout();
    closeMenu();
    navigate('/');
  };

  return (
    <nav className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm`}>
      <div className="container-padding mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Lock className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`} />
          <span className={`text-lg font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>VaultLock</span>
        </Link>

        <div className="hidden md:flex md:items-center md:space-x-4">
          <NavLink to="/" className={({ isActive }) => 
            isActive 
              ? `nav-link-active ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`
              : `nav-link ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`
          } end>
            Home
          </NavLink>
          {isAuthenticated ? (
            <NavLink to="/vault" className={({ isActive }) => 
              isActive 
                ? `nav-link-active ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`
                : `nav-link ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`
            }>
              Vault
            </NavLink>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => 
                isActive 
                  ? `nav-link-active ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`
                  : `nav-link ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`
              }>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => 
                isActive 
                  ? `nav-link-active ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`
                  : `nav-link ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`
              }>
                Register
              </NavLink>
            </>
          )}
        </div>

        <div className="hidden md:block">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleProfile}
                className={`flex items-center space-x-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} p-2 text-sm font-medium transition-colors duration-200`}
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                <div className="h-8 w-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-medium">
                  {getInitials()}
                </div>
                <span className="hidden sm:inline-block">{user?.name}</span>
              </button>

              {isProfileOpen && (
                <div className={`absolute right-0 mt-2 w-56 origin-top-right rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-2 shadow-lg ring-1 ring-black ring-opacity-5 animate-dropdown`}>
                  <div className={`px-4 py-2 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{user?.name}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} truncate`}>{user?.email}</p>
                  </div>

                  <Link to="/vault" className={`flex w-full items-center px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`} onClick={closeMenu}>
                    <Vault className="mr-3 h-4 w-4" />
                    My Vault
                  </Link>

                  <Link to="/settings" className={`flex w-full items-center px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`} onClick={closeMenu}>
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Link>

                  <button
                    onClick={() => {
                      closeMenu();
                      navigate('/change-password');
                    }}
                    className={`flex w-full items-center px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <KeyRound className="mr-3 h-4 w-4" />
                    Change Master Password
                  </button>

                  <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} mt-2`}>
                    <button onClick={handleLogout} className={`flex w-full items-center px-4 py-2 text-sm text-red-500 ${isDarkMode ? 'hover:bg-red-900/50' : 'hover:bg-red-50'}`}>
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Sign In
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={`inline-flex items-center justify-center rounded-md p-2 ${isDarkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className={`container-padding space-y-1 pb-3 pt-2 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-base font-medium ${
                  isActive 
                    ? `nav-link-active ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`
                    : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`
                }`
              }
              onClick={closeMenu}
              end
            >
              Home
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink
                  to="/vault"
                  className={({ isActive }) =>
                    `flex items-center rounded-md px-3 py-2 text-base font-medium ${
                      isActive 
                        ? `nav-link-active ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`
                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`
                    }`
                  }
                  onClick={closeMenu}
                >
                  <Vault className="mr-3 h-4 w-4" />
                  My Vault
                </NavLink>

                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `flex items-center rounded-md px-3 py-2 text-base font-medium ${
                      isActive 
                        ? `nav-link-active ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`
                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`
                    }`
                  }
                  onClick={closeMenu}
                >
                  <Settings className="mr-3 h-4 w-4" />
                  Settings
                </NavLink>

                <NavLink
                  to="/change-password"
                  className={({ isActive }) =>
                    `flex items-center rounded-md px-3 py-2 text-base font-medium ${
                      isActive 
                        ? `nav-link-active ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`
                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`
                    }`
                  }
                  onClick={closeMenu}
                >
                  <KeyRound className="mr-3 h-4 w-4" />
                  Change Master Password
                </NavLink>

                <button
                  onClick={handleLogout}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-red-500 ${isDarkMode ? 'hover:bg-red-900/50' : 'hover:bg-red-50'}`}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-base font-medium ${
                      isActive 
                        ? `nav-link-active ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`
                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`
                    }`
                  }
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-base font-medium ${
                      isActive 
                        ? `nav-link-active ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`
                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`
                    }`
                  }
                  onClick={closeMenu}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

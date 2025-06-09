import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cloud, Key, Clipboard, Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  return (
    <div className="animate-fade-in">
      {/* Post-login Welcome Section */}
      {user && (
        <section className={`${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-white to-blue-50'} py-10 md:py-16`}> 
          <div className="container-padding mx-auto flex flex-col items-center text-center gap-2">
            <h1 className={`text-3xl sm:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Welcome back, {user?.fullName || ''}!</h1>
            <p className={`text-lg mb-4 ${isDarkMode ? 'text-blue-100' : 'text-gray-700'}`}>Your secure vault is just a click away.</p>
            <Link to="/vault" className="btn btn-primary px-8 py-3 text-base rounded-lg">Go to Vault</Link>
          </div>
        </section>
      )}

      {/* Hero Section (only for guests) */}
      {!user && (
        <section className={`${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-white to-blue-50'} py-16 md:py-24`}>
          <div className="container-padding mx-auto grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col space-y-6 text-center lg:text-left">
              <h1 className={`text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}> 
                Secure Your Digital Life with{' '}
                <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>VaultLock</span>
              </h1>
              <p className={`max-w-md text-xl md:mx-0 mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}> 
                VaultLock helps you manage and encrypt your passwords with military-grade security.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center lg:justify-start">
                <Link to="/register" className="btn btn-primary px-8 py-3 text-base">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline px-8 py-3 text-base">
                  Sign In
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <div className={`absolute -left-4 -top-4 h-72 w-72 animate-pulse-slow rounded-full ${isDarkMode ? 'bg-purple-900' : 'bg-purple-100'} opacity-70 mix-blend-multiply blur-xl filter`}></div>
                <div className={`absolute -bottom-24 right-20 h-72 w-72 animate-pulse-slow rounded-full ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} opacity-70 mix-blend-multiply blur-xl filter`}></div>
                <div className="relative">
                  <div className="relative flex items-center justify-center">
                    <Lock className={`h-32 w-32 md:h-48 md:w-48 ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section (always shown) */}
      <section className="py-16 md:py-24">
        <div className="container-padding mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose VaultLock?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              Designed with security and convenience in mind.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="card flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-blue-100 p-3">
                <Shield className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">End-to-End Encryption</h3>
              <p className="text-gray-600">
                Your passwords are encrypted locally before being stored, ensuring only you can access them.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-purple-100 p-3">
                <Cloud className="h-6 w-6 text-purple-700" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Cloud Backup</h3>
              <p className="text-gray-600">
                Securely sync your encrypted vault across all your devices with cloud backup.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-blue-100 p-3">
                <Key className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Easy Access</h3>
              <p className="text-gray-600">
                Access your passwords from any device with our secure web portal or mobile app.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-purple-100 p-3">
                <Clipboard className="h-6 w-6 text-purple-700" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">One-Click Copy</h3>
              <p className="text-gray-600">
                Copy your passwords with a single click without exposing them on screen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer or CTA Section */}
      {user ? (
        <footer className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} py-8 mt-8`}>
          <div className="container-padding mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
            <div>
              <div className="font-bold text-lg text-blue-800 dark:text-blue-400">VaultLock</div>
              <div className="text-gray-500 dark:text-gray-300 text-sm mt-1">&copy; {new Date().getFullYear()} VaultLock. All rights reserved.</div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm">
              <Link to="/contact" className="text-gray-600 dark:text-gray-200 hover:underline">Contact Us</Link>
              <Link to="/privacy" className="text-gray-600 dark:text-gray-200 hover:underline">Privacy & Security</Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 dark:text-gray-200">All rights reserved</span>
            </div>
          </div>
        </footer>
      ) : (
        <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-blue-800'} py-16`}>
          <div className="container-padding mx-auto text-center">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${isDarkMode ? 'text-white' : 'text-white'}`}>
              Ready to secure your passwords?
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-xl ${isDarkMode ? 'text-gray-300' : 'text-blue-100'}`}>
              Get started with VaultLock today and take control of your digital security.
            </p>
            <div className="mt-8">
              <Link
                to="/register"
                className={`btn inline-block rounded-md px-8 py-3 text-base font-medium ${isDarkMode ? 'bg-white text-blue-800 hover:bg-gray-200' : 'bg-white text-blue-800 hover:bg-gray-100'}`}
              >
                Create Your Free Account
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;

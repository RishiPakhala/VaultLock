import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, AlertCircle, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { register } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return 0;

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return Math.min(strength, 5);
  };

  const passwordStrength = calculatePasswordStrength(password);

  const getPasswordStrengthLabel = () => {
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    return labels[passwordStrength] || '';
  };

  const getPasswordStrengthColor = () => {
    const colors = ['bg-red-500', 'bg-red-400', 'bg-yellow-500', 'bg-yellow-400', 'bg-green-500', 'bg-green-600'];
    return colors[passwordStrength] || 'bg-gray-300';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 3) {
      setError('Please use a stronger password');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      await register(fullName, email, password);
      navigate('/login');
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-14rem)] flex-col items-center justify-center py-12 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Lock className="mx-auto h-12 w-12 text-blue-800" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-800 hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3 text-sm text-red-700">{error}</div>
              </div>
            </div>
          )}

          <div className="card">
            <form className="space-y-6 p-8" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input pr-10"
                  />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {password && (
                  <>
                    <div className="mt-2 h-2 rounded-full bg-gray-200">
                      <div className={`h-full ${getPasswordStrengthColor()}`} style={{ width: `${(passwordStrength / 5) * 100}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{getPasswordStrengthLabel()}</p>
                  </>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`form-input pr-10 ${
                      confirmPassword && password !== confirmPassword
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : ''
                    }`}
                  />
                  <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute inset-y-0 right-0 pr-3 text-gray-400 hover:text-gray-600">
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-full py-2" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>

              <p className="text-xs text-center text-gray-500">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-blue-800 hover:text-blue-700">Terms of Service</a> and{' '}
                <a href="#" className="text-blue-800 hover:text-blue-700">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

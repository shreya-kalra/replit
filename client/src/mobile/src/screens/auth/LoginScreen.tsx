import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PhoneIcon, ArrowLeftIcon } from '../../components/Icons';
import type { AuthScreen } from '../../navigation/AuthStack';

interface LoginScreenProps {
  onNavigate: (screen: AuthScreen, params?: any) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate }) => {
  const { login, loginWithPhone, isLoading } = useAuth();
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('phone');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleEmailLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handlePhoneLogin = () => {
    if (phone.length >= 10) {
      onNavigate('otp', { phone });
    }
  };

  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="safe-area-top bg-zomato px-4 py-6">
        <div className="flex-row items-center justify-center">
          <div className="text-white text-2xl font-bold">Zomato</div>
        </div>
        <div className="mt-4 text-white text-center text-lg">Welcome back!</div>
        <div className="text-white text-center opacity-75">Login to your account</div>
      </div>

      <div className="flex-1 px-4 py-6">
        {/* Auth Method Toggle */}
        <div className="flex-row rounded-lg bg-gray-100 p-1 mb-6">
          <button
            className={`flex-1 py-3 rounded-md font-medium ${
              authMethod === 'phone' 
                ? 'bg-white text-zomato shadow-sm' 
                : 'text-gray-600'
            }`}
            onClick={() => setAuthMethod('phone')}
            data-testid="tab-phone"
          >
            Phone
          </button>
          <button
            className={`flex-1 py-3 rounded-md font-medium ${
              authMethod === 'email' 
                ? 'bg-white text-zomato shadow-sm' 
                : 'text-gray-600'
            }`}
            onClick={() => setAuthMethod('email')}
            data-testid="tab-email"
          >
            Email
          </button>
        </div>

        {authMethod === 'phone' ? (
          <div className="space-y-4">
            <div>
              <label className="text-gray-700 font-medium mb-2 block">Phone Number</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <PhoneIcon size={20} color="#6b7280" />
                </div>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input w-full pl-12"
                  data-testid="input-phone"
                />
              </div>
            </div>
            <button
              onClick={handlePhoneLogin}
              disabled={isLoading || phone.length < 10}
              className="btn btn-primary w-full touch-target"
              data-testid="button-send-otp"
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-gray-700 font-medium mb-2 block">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full"
                data-testid="input-email"
              />
            </div>
            <div>
              <label className="text-gray-700 font-medium mb-2 block">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input w-full"
                data-testid="input-password"
              />
            </div>
            <div className="text-right">
              <button className="text-zomato font-medium text-sm">
                Forgot Password?
              </button>
            </div>
            <button
              onClick={handleEmailLogin}
              disabled={isLoading || !email || !password}
              className="btn btn-primary w-full touch-target"
              data-testid="button-login"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        )}

        {/* Social Login */}
        <div className="my-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button className="btn btn-secondary w-full flex-row items-center justify-center">
              <div className="w-5 h-5 mr-3 bg-red-500 rounded"></div>
              <span>Continue with Google</span>
            </button>
            <button className="btn btn-secondary w-full flex-row items-center justify-center">
              <div className="w-5 h-5 mr-3 bg-blue-600 rounded"></div>
              <span>Continue with Facebook</span>
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            onClick={() => onNavigate('signup')}
            className="text-zomato font-medium"
            data-testid="button-signup-link"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
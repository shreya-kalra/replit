import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeftIcon } from '../../components/Icons';
import type { AuthScreen } from '../../navigation/AuthStack';

interface SignUpScreenProps {
  onNavigate: (screen: AuthScreen) => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onNavigate }) => {
  const { signup, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await signup(name, email, password);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="safe-area-top bg-zomato px-4 py-6">
        <div className="flex-row items-center">
          <button
            onClick={() => onNavigate('login')}
            className="mr-4 p-2"
            data-testid="button-back"
          >
            <ArrowLeftIcon size={24} color="white" />
          </button>
          <div className="flex-1">
            <div className="text-white text-2xl font-bold">Create Account</div>
            <div className="text-white opacity-75">Join Zomato family</div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="space-y-4">
          <div>
            <label className="text-gray-700 font-medium mb-2 block">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input w-full"
              data-testid="input-name"
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full"
              data-testid="input-password"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium mb-2 block">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input w-full"
              data-testid="input-confirm-password"
            />
          </div>

          <div className="flex-row items-start py-4">
            <input type="checkbox" className="mt-1 mr-3" />
            <div className="flex-1 text-sm text-gray-600">
              By creating an account, you agree to our{' '}
              <span className="text-zomato">Terms of Service</span> and{' '}
              <span className="text-zomato">Privacy Policy</span>
            </div>
          </div>

          <button
            onClick={handleSignUp}
            disabled={isLoading || !name || !email || !password || !confirmPassword}
            className="btn btn-primary w-full touch-target"
            data-testid="button-create-account"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-8">
          <span className="text-gray-600">Already have an account? </span>
          <button
            onClick={() => onNavigate('login')}
            className="text-zomato font-medium"
            data-testid="button-login-link"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
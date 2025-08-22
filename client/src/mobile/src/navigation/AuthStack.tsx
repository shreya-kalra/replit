import React, { useState } from 'react';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { OTPScreen } from '../screens/auth/OTPScreen';

export type AuthScreen = 'login' | 'signup' | 'otp';

export interface AuthStackProps {
  initialScreen?: AuthScreen;
}

export const AuthStack: React.FC<AuthStackProps> = ({ initialScreen = 'login' }) => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>(initialScreen);
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = (screen: AuthScreen, params?: any) => {
    if (screen === 'otp' && params?.phone) {
      setPhoneNumber(params.phone);
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onNavigate={navigate} />;
      case 'signup':
        return <SignUpScreen onNavigate={navigate} />;
      case 'otp':
        return <OTPScreen phoneNumber={phoneNumber} onNavigate={navigate} />;
      default:
        return <LoginScreen onNavigate={navigate} />;
    }
  };

  return <div className="flex-1">{renderScreen()}</div>;
};
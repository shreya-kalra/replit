import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeftIcon } from '../../components/Icons';
import type { AuthScreen } from '../../navigation/AuthStack';

interface OTPScreenProps {
  phoneNumber: string;
  onNavigate: (screen: AuthScreen) => void;
}

export const OTPScreen: React.FC<OTPScreenProps> = ({ phoneNumber, onNavigate }) => {
  const { loginWithPhone, isLoading } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`[data-testid="otp-input-${index + 1}"]`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`[data-testid="otp-input-${index - 1}"]`) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) return;

    try {
      await loginWithPhone(phoneNumber, otpCode);
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    
    setTimeLeft(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
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
            <div className="text-white text-2xl font-bold">Verify Phone</div>
            <div className="text-white opacity-75">Enter the 6-digit code</div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="text-center mb-8">
          <div className="text-gray-600 mb-2">
            Code sent to <span className="font-medium text-gray-900">{phoneNumber}</span>
          </div>
          <button
            onClick={() => onNavigate('login')}
            className="text-zomato font-medium text-sm"
          >
            Change number?
          </button>
        </div>

        {/* OTP Input */}
        <div className="flex-row justify-center space-x-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-zomato focus:outline-none"
              data-testid={`otp-input-${index}`}
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={isLoading || otp.join('').length !== 6}
          className="btn btn-primary w-full touch-target mb-6"
          data-testid="button-verify"
        >
          {isLoading ? 'Verifying...' : 'Verify & Continue'}
        </button>

        {/* Resend */}
        <div className="text-center">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-zomato font-medium"
              data-testid="button-resend"
            >
              Resend Code
            </button>
          ) : (
            <div className="text-gray-600">
              Resend code in {timeLeft} seconds
            </div>
          )}
        </div>

        {/* Auto verification note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          We'll automatically detect the SMS and verify for you
        </div>
      </div>
    </div>
  );
};
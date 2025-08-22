import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

interface OTPFormProps {
  phoneNumber: string;
  onBack: () => void;
  onVerified: () => void;
}

export default function OTPForm({ phoneNumber, onBack, onVerified }: OTPFormProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    // Focus the first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit code",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would verify the OTP with your backend
    toast({
      title: "OTP Verified",
      description: "Phone number verified successfully",
    });
    onVerified();
  };

  const handleResend = () => {
    if (!canResend) return;
    
    setTimeLeft(60);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    
    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-back">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Enter Verification Code</h3>
          <p className="text-gray-600 text-sm">
            We sent a 6-digit code to <span className="font-medium">{phoneNumber}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otp-input"
            data-testid={`input-otp-${index}`}
          />
        ))}
      </div>

      <Button
        onClick={handleVerify}
        className="w-full touch-target"
        disabled={otp.join("").length !== 6}
        data-testid="button-verify-otp"
      >
        Verify Code
      </Button>

      <div className="text-center">
        {canResend ? (
          <Button variant="ghost" onClick={handleResend} data-testid="button-resend-otp">
            Resend Code
          </Button>
        ) : (
          <p className="text-sm text-gray-600">
            Resend code in {timeLeft} seconds
          </p>
        )}
      </div>
    </div>
  );
}

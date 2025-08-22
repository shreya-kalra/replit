import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import OTPForm from "./OTPForm";
import { Mail, Lock, Phone } from "lucide-react";

interface AuthFormProps {
  mode: "signin" | "signup";
  onModeChange: (mode: "signin" | "signup") => void;
}

export default function AuthForm({ mode, onModeChange }: AuthFormProps) {
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [showOTP, setShowOTP] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
  });
  const { toast } = useToast();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make API calls to your auth endpoint
    toast({
      title: "Email Authentication",
      description: "This feature would integrate with your authentication system",
    });
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneNumber(formData.phone);
    setShowOTP(true);
    toast({
      title: "OTP Sent",
      description: `Verification code sent to ${formData.phone}`,
    });
  };

  if (showOTP) {
    return (
      <OTPForm
        phoneNumber={phoneNumber}
        onBack={() => setShowOTP(false)}
        onVerified={() => {
          toast({
            title: "Phone Verified",
            description: "Successfully verified phone number",
          });
          window.location.href = "/api/login";
        }}
      />
    );
  }

  return (
    <Tabs value={authMethod} onValueChange={(value) => setAuthMethod(value as "email" | "phone")}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="email" data-testid="tab-email">Email</TabsTrigger>
        <TabsTrigger value="phone" data-testid="tab-phone">Phone</TabsTrigger>
      </TabsList>

      <TabsContent value="email" className="space-y-4">
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10"
                required
                data-testid="input-email"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10"
                required
                data-testid="input-password"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <Button type="submit" className="w-full touch-target" data-testid="button-email-submit">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="phone" className="space-y-4">
        <form onSubmit={handlePhoneSubmit} className="space-y-4">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-10"
                required
                data-testid="input-phone-number"
              />
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <Button type="submit" className="w-full touch-target" data-testid="button-send-otp">
            Send OTP
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}

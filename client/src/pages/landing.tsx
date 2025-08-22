import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AuthForm from "@/components/AuthForm";
import { Utensils } from "lucide-react";

export default function Landing() {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="mobile-container">
      <div className="safe-area px-4 min-h-screen">
        {/* Header */}
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-2xl flex items-center justify-center">
            <Utensils className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2" data-testid="app-title">
            Welcome to FoodieApp
          </h1>
          <p className="text-gray-600" data-testid="app-subtitle">
            Sign in to continue your culinary journey
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <Button
            variant="outline"
            className="w-full p-4 h-auto touch-target border-gray-300"
            onClick={() => window.location.href = "/api/login"}
            data-testid="button-replit-login"
          >
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 mr-3 bg-primary rounded"></div>
              <span className="font-medium text-gray-700">Continue with Replit</span>
            </div>
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Auth Form */}
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <AuthForm mode={authMode} onModeChange={setAuthMode} />
          </CardContent>
        </Card>

        {/* Mode Toggle */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {authMode === "signin" ? "Don't have an account?" : "Already have an account?"}
            <button
              className="ml-1 text-primary font-medium"
              onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
              data-testid="button-toggle-auth-mode"
            >
              {authMode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

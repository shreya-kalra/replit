import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MobileNavigation from "@/components/MobileNavigation";
import { User, MapPin, Settings as SettingsIcon, LogOut } from "lucide-react";

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="mobile-container">
        <div className="safe-area px-4 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container">
      <div className="safe-area px-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900" data-testid="text-welcome">
              Welcome back!
            </h1>
            <p className="text-gray-600" data-testid="text-user-name">
              {user?.firstName && user?.lastName 
                ? `${user.firstName} ${user.lastName}`
                : user?.email || "User"
              }
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.location.href = "/api/logout"}
            data-testid="button-logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        {/* User Profile Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                {user?.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                    data-testid="img-profile-avatar"
                  />
                ) : (
                  <User className="h-8 w-8 text-primary" data-testid="icon-default-avatar" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-lg" data-testid="text-profile-name">
                  {user?.firstName && user?.lastName 
                    ? `${user.firstName} ${user.lastName}`
                    : "Complete your profile"
                  }
                </h2>
                <p className="text-gray-600 text-sm" data-testid="text-profile-email">
                  {user?.email}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Dietary preference: {user?.dietaryPreference || "Not set"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Manage Profile</h4>
                    <p className="text-sm text-gray-600">Update your personal information</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" data-testid="button-manage-profile">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Addresses</h4>
                    <p className="text-sm text-gray-600">Manage delivery locations</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" data-testid="button-manage-addresses">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <SettingsIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Settings</h4>
                    <p className="text-sm text-gray-600">Preferences and notifications</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" data-testid="button-manage-settings">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* App Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            FoodieApp v1.0.0
          </p>
        </div>
      </div>

      <MobileNavigation currentPage="home" />
    </div>
  );
}

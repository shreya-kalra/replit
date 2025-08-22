import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import MobileNavigation from "@/components/MobileNavigation";
import SettingToggle from "@/components/SettingToggle";
import { Settings as SettingsIcon, Smartphone, Bell, Shield, Filter, User, Download, Trash2, LogOut } from "lucide-react";
import type { UserSettings, InsertUserSettings } from "@shared/schema";

export default function Settings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user settings
  const { data: settings, isLoading } = useQuery<UserSettings>({
    queryKey: ["/api/settings"],
    retry: false,
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async (data: Partial<InsertUserSettings>) => {
      await apiRequest("PUT", "/api/settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    },
  });

  const updateSetting = (key: keyof InsertUserSettings, value: any) => {
    updateSettingsMutation.mutate({ [key]: value });
  };

  const handleSignOut = () => {
    window.location.href = "/api/logout";
  };

  if (isLoading) {
    return (
      <div className="mobile-container">
        <div className="safe-area px-4 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="mobile-container">
        <div className="safe-area px-4 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600">Unable to load settings</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container">
      <div className="safe-area px-4 pb-20">
        {/* Header */}
        <div className="py-4">
          <h1 className="text-xl font-bold text-gray-900" data-testid="text-settings-title">Settings</h1>
        </div>

        <div className="space-y-6">
          {/* App Preferences */}
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Smartphone className="text-primary mr-2 h-5 w-5" />
                App Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Language</p>
                    <p className="text-sm text-gray-600">Choose your preferred language</p>
                  </div>
                  <Select
                    value={settings.language || "en"}
                    onValueChange={(value) => updateSetting("language", value)}
                  >
                    <SelectTrigger className="w-32" data-testid="select-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="it">Italian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Theme</p>
                    <p className="text-sm text-gray-600">Choose light or dark mode</p>
                  </div>
                  <Select
                    value={settings.theme || "light"}
                    onValueChange={(value) => updateSetting("theme", value)}
                  >
                    <SelectTrigger className="w-32" data-testid="select-theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Bell className="text-primary mr-2 h-5 w-5" />
                Notifications
              </h3>
              <div className="space-y-4">
                <SettingToggle
                  title="Push Notifications"
                  description="Get notified about orders and offers"
                  checked={settings.pushNotifications ?? true}
                  onChange={(checked) => updateSetting("pushNotifications", checked)}
                  testId="toggle-push-notifications"
                />

                <SettingToggle
                  title="Email Notifications"
                  description="Receive updates via email"
                  checked={settings.emailNotifications ?? true}
                  onChange={(checked) => updateSetting("emailNotifications", checked)}
                  testId="toggle-email-notifications"
                />

                <SettingToggle
                  title="SMS Notifications"
                  description="Get text messages for important updates"
                  checked={settings.smsNotifications ?? true}
                  onChange={(checked) => updateSetting("smsNotifications", checked)}
                  testId="toggle-sms-notifications"
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment & Security */}
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="text-primary mr-2 h-5 w-5" />
                Payment & Security
              </h3>
              <div className="space-y-4">
                <SettingToggle
                  title="Biometric Authentication"
                  description="Use fingerprint or face ID for payments"
                  checked={settings.biometricAuth ?? false}
                  onChange={(checked) => updateSetting("biometricAuth", checked)}
                  testId="toggle-biometric-auth"
                />
              </div>
            </CardContent>
          </Card>

          {/* Dietary Filters */}
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="text-secondary mr-2 h-5 w-5" />
                Dietary Filters
              </h3>
              <div className="space-y-4">
                <SettingToggle
                  title="Vegetarian Only"
                  description="Show only vegetarian options"
                  checked={settings.vegetarianOnly ?? false}
                  onChange={(checked) => updateSetting("vegetarianOnly", checked)}
                  testId="toggle-vegetarian-only"
                  variant="secondary"
                />

                <SettingToggle
                  title="Hide Allergens"
                  description="Filter out items with your allergens"
                  checked={settings.hideAllergens ?? false}
                  onChange={(checked) => updateSetting("hideAllergens", checked)}
                  testId="toggle-hide-allergens"
                  variant="destructive"
                />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Preferred Spice Level</p>
                    <p className="text-sm text-gray-600">Set your heat preference</p>
                  </div>
                  <Select
                    value={settings.spiceLevel || "medium"}
                    onValueChange={(value) => updateSetting("spiceLevel", value)}
                  >
                    <SelectTrigger className="w-32" data-testid="select-spice-level">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hot">Hot</SelectItem>
                      <SelectItem value="extra-hot">Extra Hot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <User className="text-primary mr-2 h-5 w-5" />
                Account
              </h3>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  data-testid="button-export-data"
                >
                  <Download className="h-4 w-4 mr-3" />
                  Export My Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                  data-testid="button-delete-account"
                >
                  <Trash2 className="h-4 w-4 mr-3" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sign Out Button */}
          <Button
            onClick={handleSignOut}
            className="w-full bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 touch-target"
            variant="outline"
            data-testid="button-sign-out"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <MobileNavigation currentPage="settings" />
    </div>
  );
}

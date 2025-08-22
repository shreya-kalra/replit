import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import MobileNavigation from "@/components/MobileNavigation";
import PaymentMethodCard from "@/components/PaymentMethodCard";
import { User, Edit, Camera, CreditCard, Leaf } from "lucide-react";
import type { PaymentMethod } from "@shared/schema";

export default function Profile() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dietaryPreference: "",
    allergies: "",
  });

  // Fetch payment methods
  const { data: paymentMethods, isLoading: paymentMethodsLoading } = useQuery<PaymentMethod[]>({
    queryKey: ["/api/payment-methods"],
    retry: false,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await apiRequest("PUT", "/api/profile", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
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
        description: "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  // Initialize form data when user data is available
  useEffect(() => {
    if (user && !authLoading) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        dietaryPreference: user.dietaryPreference || "",
        allergies: user.allergies || "",
      });
    }
  }, [user, authLoading]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
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
  }, [user, authLoading, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  if (authLoading) {
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
          <h1 className="text-xl font-bold text-gray-900" data-testid="text-profile-title">Profile</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(!isEditing)}
            data-testid="button-edit-profile"
          >
            <Edit className="h-5 w-5 text-primary" />
          </Button>
        </div>

        {/* Profile Photo Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 mx-auto">
              {user?.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                  data-testid="img-profile-photo"
                />
              ) : (
                <User className="text-gray-400 text-2xl" data-testid="icon-default-profile" />
              )}
            </div>
            <Button
              size="icon"
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
              data-testid="button-upload-photo"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-lg font-semibold text-gray-900" data-testid="text-user-full-name">
            {user?.firstName && user?.lastName 
              ? `${user.firstName} ${user.lastName}`
              : "Complete your profile"
            }
          </h2>
          <p className="text-gray-600" data-testid="text-user-email">{user?.email}</p>
        </div>

        {/* Profile Information Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <User className="text-primary mr-2 h-5 w-5" />
                Personal Information
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      disabled={!isEditing}
                      data-testid="input-first-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      disabled={!isEditing}
                      data-testid="input-last-name"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    placeholder="+1 (555) 123-4567"
                    data-testid="input-phone"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Leaf className="text-secondary mr-2 h-5 w-5" />
                Dietary Preferences
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dietaryPreference">Diet Type</Label>
                  <Select
                    value={formData.dietaryPreference}
                    onValueChange={(value) => setFormData({ ...formData, dietaryPreference: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger data-testid="select-dietary-preference">
                      <SelectValue placeholder="Select your diet type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="pescatarian">Pescatarian</SelectItem>
                      <SelectItem value="keto">Keto</SelectItem>
                      <SelectItem value="paleo">Paleo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    disabled={!isEditing}
                    placeholder="List any food allergies or intolerances"
                    data-testid="textarea-allergies"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {isEditing && (
            <div className="flex space-x-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={updateProfileMutation.isPending}
                data-testid="button-save-profile"
              >
                {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                data-testid="button-cancel-edit"
              >
                Cancel
              </Button>
            </div>
          )}
        </form>

        {/* Payment Methods Section */}
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <CreditCard className="text-primary mr-2 h-5 w-5" />
                Payment Methods
              </h3>
              <Button variant="outline" size="sm" data-testid="button-add-payment">
                Add New
              </Button>
            </div>
            
            {paymentMethodsLoading ? (
              <div className="text-center py-4">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Loading payment methods...</p>
              </div>
            ) : paymentMethods && paymentMethods.length > 0 ? (
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <PaymentMethodCard key={method.id} paymentMethod={method} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No payment methods added</p>
                <Button variant="outline" data-testid="button-add-first-payment">
                  Add Your First Payment Method
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <MobileNavigation currentPage="profile" />
    </div>
  );
}

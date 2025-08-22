import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import MobileNavigation from "@/components/MobileNavigation";
import AddressCard from "@/components/AddressCard";
import { Plus, MapPin, Crosshair } from "lucide-react";
import type { Address, InsertAddress } from "@shared/schema";

export default function AddressPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationAddress, setLocationAddress] = useState<string>("");
  const [formData, setFormData] = useState<Omit<InsertAddress, "userId">>({
    type: "home",
    title: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    latitude: "",
    longitude: "",
    isDefault: false,
  });

  // Fetch addresses
  const { data: addresses, isLoading } = useQuery<Address[]>({
    queryKey: ["/api/addresses"],
    retry: false,
  });

  // Create address mutation
  const createAddressMutation = useMutation({
    mutationFn: async (data: Omit<InsertAddress, "userId">) => {
      await apiRequest("POST", "/api/addresses", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Address added successfully",
      });
      setIsAddDialogOpen(false);
      setFormData({
        type: "home",
        title: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "US",
        latitude: "",
        longitude: "",
        isDefault: false,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/addresses"] });
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
        description: "Failed to add address",
        variant: "destructive",
      });
    },
  });

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          setFormData({ ...formData, latitude: latitude.toString(), longitude: longitude.toString() });
          
          // Reverse geocoding would go here in a real app
          setLocationAddress(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          
          toast({
            title: "Location found",
            description: "Your current location has been detected",
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Unable to get your current location",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by this browser",
        variant: "destructive",
      });
    }
  };

  const useCurrentLocationForAddress = () => {
    if (currentLocation) {
      setFormData({
        ...formData,
        latitude: currentLocation.latitude.toString(),
        longitude: currentLocation.longitude.toString(),
        title: formData.title || "Current Location",
        addressLine1: locationAddress,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAddressMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="mobile-container">
        <div className="safe-area px-4 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading addresses...</p>
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
          <h1 className="text-xl font-bold text-gray-900" data-testid="text-addresses-title">Addresses</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-white px-4 py-2 rounded-xl font-medium" data-testid="button-add-address">
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md mx-4">
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="type">Address Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger data-testid="select-address-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Home, Office, Gym"
                    required
                    data-testid="input-address-title"
                  />
                </div>

                <div>
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <Input
                    id="addressLine1"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    placeholder="Street address"
                    required
                    data-testid="input-address-line1"
                  />
                </div>

                <div>
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input
                    id="addressLine2"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    placeholder="Apartment, suite, etc."
                    data-testid="input-address-line2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                      data-testid="input-city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                      data-testid="input-state"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    required
                    data-testid="input-zip-code"
                  />
                </div>

                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={getCurrentLocation}
                    className="w-full"
                    data-testid="button-get-location"
                  >
                    <Crosshair className="h-4 w-4 mr-2" />
                    Use Current Location
                  </Button>
                  {currentLocation && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={useCurrentLocationForAddress}
                      className="w-full text-sm"
                      data-testid="button-use-location"
                    >
                      Use for address: {locationAddress}
                    </Button>
                  )}
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={createAddressMutation.isPending}
                    data-testid="button-save-address"
                  >
                    {createAddressMutation.isPending ? "Saving..." : "Save Address"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                    data-testid="button-cancel-address"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Current Location Card */}
        <Card className="bg-blue-50 border-blue-200 mb-4">
          <CardContent className="p-4">
            <div className="flex items-center mb-2">
              <Crosshair className="text-blue-600 mr-2 h-5 w-5" />
              <span className="font-medium text-blue-900">Use Current Location</span>
            </div>
            <p className="text-sm text-blue-700 mb-3">
              {currentLocation ? locationAddress : "Detect your current location for quick delivery"}
            </p>
            <Button
              onClick={getCurrentLocation}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              data-testid="button-detect-location"
            >
              <Crosshair className="h-4 w-4 mr-2" />
              {currentLocation ? "Update Location" : "Detect Location"}
            </Button>
          </CardContent>
        </Card>

        {/* Saved Addresses */}
        <div className="space-y-4">
          {addresses && addresses.length > 0 ? (
            addresses.map((address) => (
              <AddressCard key={address.id} address={address} />
            ))
          ) : (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
              <p className="text-gray-500 mb-6">Add your first address to get started with deliveries</p>
              <Button onClick={() => setIsAddDialogOpen(true)} data-testid="button-add-first-address">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Address
              </Button>
            </div>
          )}
        </div>
      </div>

      <MobileNavigation currentPage="address" />
    </div>
  );
}

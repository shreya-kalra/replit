import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Home, Briefcase, MapPin, Edit, Trash2 } from "lucide-react";
import type { Address } from "@shared/schema";

interface AddressCardProps {
  address: Address;
}

export default function AddressCard({ address }: AddressCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="h-5 w-5 text-green-600" />;
      case "work":
        return <Briefcase className="h-5 w-5 text-blue-600" />;
      default:
        return <MapPin className="h-5 w-5 text-purple-600" />;
    }
  };

  const getAddressColor = (type: string) => {
    switch (type) {
      case "home":
        return "bg-green-100";
      case "work":
        return "bg-blue-100";
      default:
        return "bg-purple-100";
    }
  };

  // Delete address mutation
  const deleteAddressMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/addresses/${address.id}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Address deleted successfully",
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
        description: "Failed to delete address",
        variant: "destructive",
      });
    },
  });

  // Set default address mutation
  const setDefaultMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", `/api/addresses/${address.id}/set-default`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Default address updated",
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
        description: "Failed to set default address",
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this address?")) {
      deleteAddressMutation.mutate();
    }
  };

  const handleSetDefault = () => {
    setDefaultMutation.mutate();
  };

  return (
    <Card className="border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className={`w-10 h-10 ${getAddressColor(address.type)} rounded-lg flex items-center justify-center mr-3`}>
              {getAddressIcon(address.type)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900 capitalize" data-testid={`text-address-title-${address.id}`}>
                  {address.title}
                </h3>
                {address.isDefault && (
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                    Default
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600" data-testid={`text-address-line1-${address.id}`}>
                {address.addressLine1}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" data-testid={`button-edit-address-${address.id}`}>
              <Edit className="h-4 w-4 text-gray-400" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              disabled={deleteAddressMutation.isPending}
              data-testid={`button-delete-address-${address.id}`}
            >
              <Trash2 className="h-4 w-4 text-red-400" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-1">
          {address.addressLine2 && (
            <p className="text-gray-700" data-testid={`text-address-line2-${address.id}`}>
              {address.addressLine2}
            </p>
          )}
          <p className="text-gray-600 text-sm" data-testid={`text-address-city-state-${address.id}`}>
            {address.city}, {address.state} {address.zipCode}
          </p>
        </div>

        {!address.isDefault && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSetDefault}
              disabled={setDefaultMutation.isPending}
              className="text-primary font-medium text-sm p-0 h-auto"
              data-testid={`button-set-default-${address.id}`}
            >
              {setDefaultMutation.isPending ? "Setting..." : "Set as Default"}
            </Button>
          </div>
        )}
        
        {address.isDefault && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <span className="text-gray-500 text-sm">Currently your default address</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

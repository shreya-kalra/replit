import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { CreditCard, Trash2 } from "lucide-react";
import type { PaymentMethod } from "@shared/schema";

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
}

export default function PaymentMethodCard({ paymentMethod }: PaymentMethodCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const getCardIcon = (provider: string) => {
    const iconClass = "text-xl mr-3";
    switch (provider.toLowerCase()) {
      case "visa":
        return <CreditCard className={`${iconClass} text-blue-600`} />;
      case "mastercard":
        return <CreditCard className={`${iconClass} text-red-600`} />;
      case "amex":
        return <CreditCard className={`${iconClass} text-green-600`} />;
      default:
        return <CreditCard className={`${iconClass} text-gray-600`} />;
    }
  };

  // Delete payment method mutation
  const deletePaymentMethodMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/payment-methods/${paymentMethod.id}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Payment method deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/payment-methods"] });
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
        description: "Failed to delete payment method",
        variant: "destructive",
      });
    },
  });

  // Set default payment method mutation
  const setDefaultMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", `/api/payment-methods/${paymentMethod.id}/set-default`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Default payment method updated",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/payment-methods"] });
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
        description: "Failed to set default payment method",
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this payment method?")) {
      deletePaymentMethodMutation.mutate();
    }
  };

  const handleSetDefault = () => {
    setDefaultMutation.mutate();
  };

  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
      <div className="flex items-center">
        {getCardIcon(paymentMethod.provider)}
        <div>
          <p className="font-medium" data-testid={`text-card-number-${paymentMethod.id}`}>
            •••• •••• •••• {paymentMethod.lastFourDigits}
          </p>
          <p className="text-sm text-gray-600" data-testid={`text-card-expiry-${paymentMethod.id}`}>
            Expires {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {paymentMethod.isDefault ? (
          <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
            Default
          </span>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSetDefault}
            disabled={setDefaultMutation.isPending}
            className="text-primary text-xs p-1 h-auto"
            data-testid={`button-set-default-payment-${paymentMethod.id}`}
          >
            Set Default
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          disabled={deletePaymentMethodMutation.isPending}
          className="h-8 w-8"
          data-testid={`button-delete-payment-${paymentMethod.id}`}
        >
          <Trash2 className="h-4 w-4 text-red-400" />
        </Button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ArrowLeftIcon, PlusIcon, MinusIcon, MapPinIcon } from '../../components/Icons';
import type { MainScreen } from '../../navigation/MainNavigator';

interface CartScreenProps {
  onNavigate: (screen: MainScreen) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({ onNavigate }) => {
  const { items, totalPrice, updateQuantity, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const deliveryFee = 49;
  const taxes = Math.round(totalPrice * 0.05); // 5% tax
  const grandTotal = totalPrice + deliveryFee + taxes;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    setIsCheckingOut(false);
    // Navigate to orders or show success
    onNavigate('orders');
  };

  if (items.length === 0) {
    return (
      <div className="flex-1 bg-white">
        <div className="safe-area-top bg-zomato px-4 py-6">
          <div className="flex-row items-center">
            <button
              onClick={() => onNavigate('home')}
              className="mr-4 p-2"
              data-testid="button-back"
            >
              <ArrowLeftIcon size={24} color="white" />
            </button>
            <h1 className="text-white text-xl font-semibold">Cart</h1>
          </div>
        </div>

        <div className="flex-1 items-center justify-center px-4">
          <div className="w-32 h-32 bg-gray-200 rounded-full items-center justify-center mb-6">
            <div className="text-4xl">🛒</div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
            Your cart is empty
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Add some delicious food from restaurants
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="btn btn-primary"
            data-testid="button-start-shopping"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="safe-area-top bg-zomato px-4 py-6">
        <div className="flex-row items-center justify-between">
          <div className="flex-row items-center">
            <button
              onClick={() => onNavigate('home')}
              className="mr-4 p-2"
              data-testid="button-back"
            >
              <ArrowLeftIcon size={24} color="white" />
            </button>
            <h1 className="text-white text-xl font-semibold">Cart</h1>
          </div>
          <button
            onClick={clearCart}
            className="text-white opacity-90 text-sm font-medium"
            data-testid="button-clear-cart"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="flex-1 pb-32">
        {/* Restaurant Info */}
        <div className="bg-white px-4 py-4 mb-4">
          <h2 className="font-semibold text-lg text-gray-900 mb-1">
            {items[0]?.restaurantName}
          </h2>
          <div className="flex-row items-center">
            <MapPinIcon size={16} color="#6b7280" />
            <span className="text-gray-600 ml-2">Delivering to Home</span>
          </div>
        </div>

        {/* Cart Items */}
        <div className="bg-white mb-4">
          {items.map((item) => (
            <div key={item.id} className="px-4 py-4 border-b border-gray-100">
              <div className="flex-row">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover mr-4"
                />
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">₹{item.price}</p>
                  
                  <div className="flex-row items-center justify-between">
                    <div className="flex-row items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-gray-600"
                        data-testid={`button-minus-${item.id}`}
                      >
                        <MinusIcon size={16} />
                      </button>
                      <span className="px-4 py-2 font-medium" data-testid={`quantity-${item.id}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-gray-600"
                        data-testid={`button-plus-${item.id}`}
                      >
                        <PlusIcon size={16} />
                      </button>
                    </div>
                    
                    <span className="font-semibold text-gray-900">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Details */}
        <div className="bg-white px-4 py-4 mb-4">
          <h3 className="font-semibold text-gray-900 mb-4">Bill Details</h3>
          
          <div className="space-y-3">
            <div className="flex-row justify-between">
              <span className="text-gray-600">Item Total</span>
              <span className="text-gray-900">₹{totalPrice}</span>
            </div>
            
            <div className="flex-row justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="text-gray-900">₹{deliveryFee}</span>
            </div>
            
            <div className="flex-row justify-between">
              <span className="text-gray-600">Taxes & Charges</span>
              <span className="text-gray-900">₹{taxes}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex-row justify-between">
                <span className="font-semibold text-lg text-gray-900">Grand Total</span>
                <span className="font-semibold text-lg text-gray-900">₹{grandTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="bg-white px-4 py-4">
          <h3 className="font-semibold text-gray-900 mb-4">Payment Options</h3>
          
          <div className="space-y-3">
            <div className="flex-row items-center p-3 border border-gray-200 rounded-lg">
              <input type="radio" name="payment" className="mr-3" defaultChecked />
              <span className="flex-1">Cash on Delivery</span>
            </div>
            
            <div className="flex-row items-center p-3 border border-gray-200 rounded-lg">
              <input type="radio" name="payment" className="mr-3" />
              <span className="flex-1">UPI</span>
            </div>
            
            <div className="flex-row items-center p-3 border border-gray-200 rounded-lg">
              <input type="radio" name="payment" className="mr-3" />
              <span className="flex-1">Credit/Debit Card</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-mobile bg-white border-t border-gray-200 p-4 safe-area-bottom">
        <button
          onClick={handleCheckout}
          disabled={isCheckingOut}
          className="btn btn-primary w-full text-lg py-4"
          data-testid="button-place-order"
        >
          {isCheckingOut ? 'Placing Order...' : `Place Order ₹${grandTotal}`}
        </button>
        
        <p className="text-center text-xs text-gray-500 mt-2">
          By placing order, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
};
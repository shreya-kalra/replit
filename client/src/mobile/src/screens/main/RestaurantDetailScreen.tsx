import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ArrowLeftIcon, StarIcon, ClockIcon, MapPinIcon, PlusIcon, MinusIcon } from '../../components/Icons';
import type { MainScreen } from '../../navigation/MainNavigator';

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  rating?: number;
  popular?: boolean;
}

interface RestaurantDetailScreenProps {
  restaurantId: string;
  onNavigate: (screen: MainScreen) => void;
}

const restaurant = {
  id: '1',
  name: 'Pizza Palace',
  cuisine: 'Italian, Pizza',
  rating: 4.5,
  deliveryTime: '25-30 min',
  image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=250&fit=crop',
  priceRange: '₹200 for two',
  distance: '1.2 km',
  address: '123 Food Street, New York',
  isOpen: true,
  offers: ['50% OFF up to ₹100', 'Free delivery on orders above ₹199']
};

const menuItems: FoodItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella cheese, and fresh basil',
    price: 299,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=150&fit=crop',
    category: 'Pizza',
    isVeg: true,
    rating: 4.6,
    popular: true
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    description: 'Loaded with pepperoni, mozzarella cheese and tomato sauce',
    price: 399,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=150&fit=crop',
    category: 'Pizza',
    isVeg: false,
    rating: 4.4
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce, parmesan cheese, croutons with caesar dressing',
    price: 199,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=150&fit=crop',
    category: 'Salads',
    isVeg: true,
    rating: 4.2
  },
  {
    id: '4',
    name: 'Garlic Bread',
    description: 'Freshly baked bread with garlic butter and herbs',
    price: 149,
    image: 'https://images.unsplash.com/photo-1619740455993-1e33bb368c86?w=200&h=150&fit=crop',
    category: 'Sides',
    isVeg: true,
    rating: 4.1
  }
];

const categories = ['Pizza', 'Salads', 'Sides', 'Beverages'];

export const RestaurantDetailScreen: React.FC<RestaurantDetailScreenProps> = ({ 
  restaurantId, 
  onNavigate 
}) => {
  const { addItem, items, updateQuantity } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('Pizza');

  const getItemQuantity = (itemId: string) => {
    const item = items.find(item => item.id === itemId);
    return item?.quantity || 0;
  };

  const handleAddItem = (item: FoodItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId,
      restaurantName: restaurant.name
    });
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const FoodItemCard: React.FC<{ item: FoodItem }> = ({ item }) => {
    const quantity = getItemQuantity(item.id);

    return (
      <div className="food-item" data-testid={`food-item-${item.id}`}>
        <div className="flex-row">
          <div className="flex-1 pr-4">
            <div className="flex-row items-center mb-2">
              <div className={`w-3 h-3 border-2 ${item.isVeg ? 'border-green-500' : 'border-red-500'} mr-2`}>
                <div className={`w-full h-full rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
              </div>
              {item.popular && (
                <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded">
                  Popular
                </span>
              )}
            </div>
            
            <h3 className="font-semibold text-gray-900 text-lg mb-1">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            
            {item.rating && (
              <div className="flex-row items-center mb-2">
                <StarIcon size={14} color="#fbbf24" filled />
                <span className="text-sm font-medium ml-1">{item.rating}</span>
              </div>
            )}
            
            <div className="font-bold text-lg text-gray-900">₹{item.price}</div>
          </div>
          
          <div className="items-center">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-24 h-24 rounded-lg object-cover mb-3"
            />
            
            {quantity === 0 ? (
              <button
                onClick={() => handleAddItem(item)}
                className="bg-zomato text-white px-6 py-2 rounded-lg font-medium"
                data-testid={`button-add-${item.id}`}
              >
                ADD
              </button>
            ) : (
              <div className="flex-row items-center border border-zomato rounded-lg">
                <button
                  onClick={() => handleUpdateQuantity(item.id, quantity - 1)}
                  className="p-2 text-zomato"
                  data-testid={`button-minus-${item.id}`}
                >
                  <MinusIcon size={16} />
                </button>
                <span className="px-4 py-2 text-zomato font-medium" data-testid={`quantity-${item.id}`}>
                  {quantity}
                </span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, quantity + 1)}
                  className="p-2 text-zomato"
                  data-testid={`button-plus-${item.id}`}
                >
                  <PlusIcon size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="flex-1 bg-white">
      {/* Header Image */}
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-0 left-0 right-0 safe-area-top px-4 py-4">
          <button
            onClick={() => onNavigate('home')}
            className="bg-white bg-opacity-90 p-3 rounded-full"
            data-testid="button-back"
          >
            <ArrowLeftIcon size={20} color="#374151" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h1 className="text-white text-2xl font-bold mb-1">{restaurant.name}</h1>
          <p className="text-white opacity-90">{restaurant.cuisine}</p>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex-row items-center justify-between mb-3">
          <div className="flex-row items-center">
            <div className="rating mr-3">
              <StarIcon size={14} color="white" filled />
              <span className="ml-1">{restaurant.rating}</span>
            </div>
            <span className="text-gray-600">|</span>
            <span className="text-gray-600 ml-3">{restaurant.priceRange}</span>
          </div>
          <div className={`status-badge ${restaurant.isOpen ? 'status-open' : 'status-closed'}`}>
            {restaurant.isOpen ? 'Open' : 'Closed'}
          </div>
        </div>

        <div className="flex-row items-center mb-3">
          <ClockIcon size={16} color="#6b7280" />
          <span className="text-gray-600 ml-2">{restaurant.deliveryTime}</span>
          <span className="text-gray-600 mx-2">•</span>
          <MapPinIcon size={16} color="#6b7280" />
          <span className="text-gray-600 ml-2">{restaurant.distance}</span>
        </div>

        {/* Offers */}
        <div className="space-y-2">
          {restaurant.offers.map((offer, index) => (
            <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
              <span className="text-blue-700 font-medium text-sm">{offer}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Categories */}
      <div className="tab-nav">
        <div className="flex-row overflow-scroll no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`tab-item ${selectedCategory === category ? 'active' : ''}`}
              data-testid={`tab-${category}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 pb-32">
        {filteredItems.map((item) => (
          <FoodItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Cart Button */}
      {items.length > 0 && (
        <button
          onClick={() => onNavigate('cart')}
          className="cart-button"
          data-testid="button-view-cart"
        >
          View Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
        </button>
      )}
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SearchIcon, FilterIcon, MapPinIcon, StarIcon } from '../../components/Icons';
import type { MainScreen } from '../../navigation/MainNavigator';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  priceRange: string;
  distance: string;
  isOpen: boolean;
  offers?: string;
}

interface HomeScreenProps {
  onNavigate: (screen: MainScreen, params?: any) => void;
}

const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizza Palace',
    cuisine: 'Italian, Pizza',
    rating: 4.5,
    deliveryTime: '25-30 min',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop',
    priceRange: '₹200 for two',
    distance: '1.2 km',
    isOpen: true,
    offers: '50% OFF'
  },
  {
    id: '2',
    name: 'Burger Barn',
    cuisine: 'American, Burgers',
    rating: 4.2,
    deliveryTime: '20-25 min',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=300&h=200&fit=crop',
    priceRange: '₹300 for two',
    distance: '0.8 km',
    isOpen: true
  },
  {
    id: '3',
    name: 'Sushi Central',
    cuisine: 'Japanese, Sushi',
    rating: 4.7,
    deliveryTime: '35-40 min',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop',
    priceRange: '₹800 for two',
    distance: '2.1 km',
    isOpen: false
  },
  {
    id: '4',
    name: 'Spice Garden',
    cuisine: 'Indian, North Indian',
    rating: 4.3,
    deliveryTime: '30-35 min',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop',
    priceRange: '₹400 for two',
    distance: '1.5 km',
    isOpen: true,
    offers: '₹100 OFF'
  }
];

const categories = [
  { id: '1', name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=80&h=80&fit=crop' },
  { id: '2', name: 'Burger', image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=80&h=80&fit=crop' },
  { id: '3', name: 'Sushi', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=80&h=80&fit=crop' },
  { id: '4', name: 'Indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=80&h=80&fit=crop' },
  { id: '5', name: 'Chinese', image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=80&h=80&fit=crop' },
  { id: '6', name: 'Dessert', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=80&h=80&fit=crop' }
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => (
    <div 
      className="restaurant-card card cursor-pointer"
      onClick={() => onNavigate('restaurant', { restaurantId: restaurant.id })}
      data-testid={`restaurant-card-${restaurant.id}`}
    >
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        {restaurant.offers && (
          <div className="absolute top-3 left-3 bg-zomato text-white px-2 py-1 rounded text-xs font-semibold">
            {restaurant.offers}
          </div>
        )}
        <div className={`absolute top-3 right-3 status-badge ${restaurant.isOpen ? 'status-open' : 'status-closed'}`}>
          {restaurant.isOpen ? 'Open' : 'Closed'}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex-row justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{restaurant.name}</h3>
            <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
          </div>
          <div className="rating ml-3">
            <StarIcon size={12} color="white" filled />
            <span className="ml-1">{restaurant.rating}</span>
          </div>
        </div>
        
        <div className="flex-row justify-between items-center text-sm text-gray-600">
          <span>{restaurant.deliveryTime}</span>
          <span>{restaurant.priceRange}</span>
          <span>{restaurant.distance}</span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex-1 bg-white">
        <div className="safe-area-top bg-zomato px-4 py-6">
          <div className="skeleton h-8 w-32 rounded mb-2"></div>
          <div className="skeleton h-4 w-48 rounded"></div>
        </div>
        <div className="px-4 py-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="card mb-4">
              <div className="skeleton h-48 w-full"></div>
              <div className="p-4">
                <div className="skeleton h-6 w-3/4 rounded mb-2"></div>
                <div className="skeleton h-4 w-1/2 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="safe-area-top bg-zomato px-4 py-6">
        <div className="flex-row items-center justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-white text-2xl font-bold">Hi {user?.name?.split(' ')[0] || 'there'}!</h1>
            <div className="flex-row items-center mt-1">
              <MapPinIcon size={16} color="white" />
              <span className="text-white ml-2 opacity-90">Home - New York</span>
            </div>
          </div>
          <button 
            className="bg-white bg-opacity-20 p-3 rounded-full"
            data-testid="button-notifications"
          >
            <div className="w-6 h-6 bg-white rounded-full opacity-80"></div>
          </button>
        </div>

        {/* Search Bar */}
        <button
          onClick={() => onNavigate('search')}
          className="search-bar bg-white rounded-lg px-4 py-3 flex-row items-center w-full"
          data-testid="button-search"
        >
          <SearchIcon size={20} color="#6b7280" />
          <span className="ml-3 text-gray-500 flex-1 text-left">
            Search for restaurants, cuisines...
          </span>
          <FilterIcon size={20} color="#6b7280" />
        </button>
      </div>

      <div className="flex-1 pb-20">
        {/* Categories */}
        <div className="bg-white px-4 py-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What's on your mind?</h2>
          <div className="flex-row overflow-scroll no-scrollbar">
            {categories.map((category) => (
              <div key={category.id} className="items-center mr-6 min-w-16">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Offers Banner */}
        <div className="mx-4 my-4">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-4 text-white">
            <h3 className="text-lg font-bold mb-1">Free Delivery</h3>
            <p className="text-sm opacity-90">On orders above ₹199</p>
            <div className="text-xs opacity-75 mt-2">*T&C Apply</div>
          </div>
        </div>

        {/* Restaurants List */}
        <div className="px-4">
          <div className="flex-row justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Restaurants near you</h2>
            <button className="text-zomato font-medium text-sm">
              See all
            </button>
          </div>

          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
};
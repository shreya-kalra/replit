import React, { useState } from 'react';
import { SearchIcon, FilterIcon, StarIcon, ClockIcon } from '../../components/Icons';
import type { MainScreen } from '../../navigation/MainNavigator';

interface SearchScreenProps {
  onNavigate: (screen: MainScreen, params?: any) => void;
}

const searchSuggestions = [
  'Pizza', 'Burger', 'Biryani', 'Chinese', 'South Indian', 'North Indian',
  'Desserts', 'Ice Cream', 'Beverages', 'Healthy Food'
];

const trendingSearches = [
  'Masala Dosa', 'Chicken Biryani', 'Margherita Pizza', 'Butter Chicken',
  'Hakka Noodles', 'Gulab Jamun'
];

const searchResults = [
  {
    id: '1',
    type: 'restaurant',
    name: 'Pizza Palace',
    cuisine: 'Italian, Pizza',
    rating: 4.5,
    deliveryTime: '25-30 min',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop',
    distance: '1.2 km',
    isOpen: true
  },
  {
    id: '2',
    type: 'dish',
    name: 'Margherita Pizza',
    restaurant: 'Pizza Palace',
    price: 299,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=150&fit=crop',
    isVeg: true
  },
  {
    id: '3',
    type: 'restaurant',
    name: 'Spice Garden',
    cuisine: 'Indian, North Indian',
    rating: 4.3,
    deliveryTime: '30-35 min',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop',
    distance: '1.5 km',
    isOpen: true
  }
];

export const SearchScreen: React.FC<SearchScreenProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'restaurants' | 'dishes'>('restaurants');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => setIsSearching(false), 500);
    } else {
      setIsSearching(false);
    }
  };

  const RestaurantResult: React.FC<{ restaurant: any }> = ({ restaurant }) => (
    <div 
      className="bg-white p-4 border-b border-gray-100 cursor-pointer"
      onClick={() => onNavigate('restaurant', { restaurantId: restaurant.id })}
      data-testid={`search-result-${restaurant.id}`}
    >
      <div className="flex-row">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-20 h-20 rounded-lg object-cover mr-4"
        />
        
        <div className="flex-1">
          <div className="flex-row items-center justify-between mb-1">
            <h3 className="font-semibold text-lg text-gray-900">{restaurant.name}</h3>
            <div className="rating">
              <StarIcon size={12} color="white" filled />
              <span className="ml-1">{restaurant.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
          
          <div className="flex-row items-center text-sm text-gray-600">
            <ClockIcon size={14} color="#6b7280" />
            <span className="ml-1 mr-3">{restaurant.deliveryTime}</span>
            <span>• {restaurant.distance}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const DishResult: React.FC<{ dish: any }> = ({ dish }) => (
    <div className="bg-white p-4 border-b border-gray-100">
      <div className="flex-row">
        <img 
          src={dish.image} 
          alt={dish.name}
          className="w-20 h-20 rounded-lg object-cover mr-4"
        />
        
        <div className="flex-1">
          <div className="flex-row items-center mb-1">
            <div className={`w-3 h-3 border-2 ${dish.isVeg ? 'border-green-500' : 'border-red-500'} mr-2`}>
              <div className={`w-full h-full rounded-full ${dish.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            <h3 className="font-semibold text-lg text-gray-900 flex-1">{dish.name}</h3>
            <div className="rating">
              <StarIcon size={12} color="white" filled />
              <span className="ml-1">{dish.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-2">from {dish.restaurant}</p>
          <p className="font-semibold text-gray-900">₹{dish.price}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header with Search */}
      <div className="safe-area-top bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex-row items-center">
          <div className="flex-1 relative">
            <SearchIcon size={20} color="#6b7280" className="absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for restaurants, cuisines or dishes"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-zomato focus:outline-none"
              data-testid="input-search"
              autoFocus
            />
          </div>
          <button className="ml-4 p-3 bg-gray-100 rounded-lg">
            <FilterIcon size={20} color="#6b7280" />
          </button>
        </div>

        {/* Search Results Tabs */}
        {searchQuery && (
          <div className="flex-row mt-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === 'restaurants' 
                  ? 'text-zomato border-b-2 border-zomato' 
                  : 'text-gray-600'
              }`}
              data-testid="tab-restaurants"
            >
              Restaurants
            </button>
            <button
              onClick={() => setActiveTab('dishes')}
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === 'dishes' 
                  ? 'text-zomato border-b-2 border-zomato' 
                  : 'text-gray-600'
              }`}
              data-testid="tab-dishes"
            >
              Dishes
            </button>
          </div>
        )}
      </div>

      <div className="flex-1">
        {!searchQuery ? (
          // No search query - show suggestions
          <div className="bg-white">
            {/* Popular Cuisines */}
            <div className="px-4 py-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Cuisines</h2>
              <div className="flex-row flex-wrap">
                {searchSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSearch(suggestion)}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full mr-3 mb-3 font-medium"
                    data-testid={`suggestion-${suggestion}`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Searches */}
            <div className="border-t border-gray-200 px-4 py-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Trending Searches</h2>
              <div className="space-y-3">
                {trendingSearches.map((trend) => (
                  <button
                    key={trend}
                    onClick={() => handleSearch(trend)}
                    className="flex-row items-center w-full text-left"
                    data-testid={`trending-${trend}`}
                  >
                    <SearchIcon size={16} color="#6b7280" />
                    <span className="ml-3 text-gray-700">{trend}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : isSearching ? (
          // Loading state
          <div className="flex-1 items-center justify-center">
            <div className="w-8 h-8 border-4 border-zomato border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">Searching...</p>
          </div>
        ) : (
          // Search results
          <div className="pb-20">
            {activeTab === 'restaurants' ? (
              <div>
                {searchResults
                  .filter(result => result.type === 'restaurant')
                  .map((restaurant) => (
                    <RestaurantResult key={restaurant.id} restaurant={restaurant} />
                  ))}
              </div>
            ) : (
              <div>
                {searchResults
                  .filter(result => result.type === 'dish')
                  .map((dish) => (
                    <DishResult key={dish.id} dish={dish} />
                  ))}
              </div>
            )}

            {/* No results */}
            {searchResults.length === 0 && (
              <div className="text-center py-16 px-4">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600">
                  Try searching for something else
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
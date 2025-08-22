import React, { useState } from 'react';
import { HomeScreen } from '../screens/main/HomeScreen';
import { SearchScreen } from '../screens/main/SearchScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { CartScreen } from '../screens/main/CartScreen';
import { RestaurantDetailScreen } from '../screens/main/RestaurantDetailScreen';
import { OrderHistoryScreen } from '../screens/main/OrderHistoryScreen';
import { BottomNavigation } from '../components/BottomNavigation';
import { CartProvider } from '../context/CartContext';

export type MainScreen = 'home' | 'search' | 'profile' | 'cart' | 'restaurant' | 'orders';

export interface NavigationParams {
  restaurantId?: string;
}

export const MainNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<MainScreen>('home');
  const [navigationParams, setNavigationParams] = useState<NavigationParams>({});

  const navigate = (screen: MainScreen, params?: NavigationParams) => {
    setCurrentScreen(screen);
    if (params) {
      setNavigationParams(params);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={navigate} />;
      case 'search':
        return <SearchScreen onNavigate={navigate} />;
      case 'profile':
        return <ProfileScreen onNavigate={navigate} />;
      case 'cart':
        return <CartScreen onNavigate={navigate} />;
      case 'restaurant':
        return (
          <RestaurantDetailScreen 
            restaurantId={navigationParams.restaurantId || '1'} 
            onNavigate={navigate} 
          />
        );
      case 'orders':
        return <OrderHistoryScreen onNavigate={navigate} />;
      default:
        return <HomeScreen onNavigate={navigate} />;
    }
  };

  return (
    <CartProvider>
      <div className="flex-1">
        {renderScreen()}
        <BottomNavigation 
          currentScreen={currentScreen} 
          onNavigate={navigate} 
        />
      </div>
    </CartProvider>
  );
};
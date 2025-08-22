import React from 'react';
import { useCart } from '../context/CartContext';
import { HomeIcon, SearchIcon, UserIcon, ShoppingBagIcon, HeartIcon } from './Icons';
import type { MainScreen } from '../navigation/MainNavigator';

interface BottomNavigationProps {
  currentScreen: MainScreen;
  onNavigate: (screen: MainScreen) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  currentScreen, 
  onNavigate 
}) => {
  const { totalItems } = useCart();

  const navItems = [
    { screen: 'home' as MainScreen, icon: HomeIcon, label: 'Home' },
    { screen: 'search' as MainScreen, icon: SearchIcon, label: 'Search' },
    { screen: 'cart' as MainScreen, icon: ShoppingBagIcon, label: 'Cart', badge: totalItems },
    { screen: 'orders' as MainScreen, icon: HeartIcon, label: 'Orders' },
    { screen: 'profile' as MainScreen, icon: UserIcon, label: 'Profile' },
  ];

  return (
    <div className="bottom-nav">
      <div className="flex-row">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;

          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`nav-item ${isActive ? 'active' : ''}`}
              data-testid={`nav-${item.screen}`}
            >
              <div className="relative">
                <Icon 
                  size={22} 
                  color={isActive ? '#E23744' : '#6b7280'} 
                />
                {item.badge && item.badge > 0 && (
                  <div className="absolute -top-2 -right-2 bg-zomato text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </div>
                )}
              </div>
              <span className={`text-xs mt-1 ${isActive ? 'text-zomato' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
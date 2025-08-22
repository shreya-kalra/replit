import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeftIcon, UserIcon, MapPinIcon, HeartIcon, ShoppingBagIcon, TruckIcon } from '../../components/Icons';
import type { MainScreen } from '../../navigation/MainNavigator';

interface ProfileScreenProps {
  onNavigate: (screen: MainScreen) => void;
}

const menuItems = [
  {
    id: 'orders',
    title: 'Your Orders',
    subtitle: 'Track, reorder or help',
    icon: ShoppingBagIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: 'addresses',
    title: 'Address Book',
    subtitle: 'Manage your delivery addresses',
    icon: MapPinIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    id: 'favorites',
    title: 'Favorite Restaurants',
    subtitle: 'Your most loved places',
    icon: HeartIcon,
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  },
  {
    id: 'membership',
    title: 'Zomato Pro',
    subtitle: 'View benefits & manage',
    icon: TruckIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  }
];

const supportItems = [
  { id: 'help', title: 'Help & Support', subtitle: 'Get help with your orders' },
  { id: 'about', title: 'About', subtitle: 'About us, careers, team' },
  { id: 'terms', title: 'Terms & Privacy', subtitle: 'Read our terms and privacy policy' }
];

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="safe-area-top bg-zomato px-4 py-6">
        <div className="flex-row items-center justify-between">
          <h1 className="text-white text-xl font-semibold">Profile</h1>
          <button
            onClick={() => onNavigate('home')}
            className="text-white opacity-90"
          >
            <ArrowLeftIcon size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 pb-20">
        {/* User Info */}
        <div className="bg-white px-4 py-6 mb-4">
          <div className="flex-row items-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 items-center justify-center mr-4">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <UserIcon size={32} color="#9ca3af" />
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {user?.name || 'User'}
              </h2>
              <p className="text-gray-600 mb-1">{user?.email}</p>
              <p className="text-gray-600">{user?.phone}</p>
            </div>
            
            <button className="text-zomato font-medium" data-testid="button-edit-profile">
              Edit
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white px-4 py-4 mb-4">
          <div className="flex-row">
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">24</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">3</div>
              <div className="text-sm text-gray-600">Favorites</div>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">₹2,340</div>
              <div className="text-sm text-gray-600">Total Saved</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white mb-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`w-full p-4 flex-row items-center ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
                data-testid={`menu-${item.id}`}
              >
                <div className={`w-12 h-12 rounded-lg ${item.bgColor} items-center justify-center mr-4`}>
                  <Icon size={24} color={item.color.replace('text-', '#')} />
                </div>
                
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.subtitle}</p>
                </div>
                
                <ArrowLeftIcon size={16} color="#9ca3af" className="transform rotate-180" />
              </button>
            );
          })}
        </div>

        {/* Support Section */}
        <div className="bg-white mb-4">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Support</h3>
          </div>
          
          {supportItems.map((item, index) => (
            <button
              key={item.id}
              className={`w-full p-4 flex-row items-center justify-between ${
                index !== supportItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              data-testid={`support-${item.id}`}
            >
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.subtitle}</p>
              </div>
              
              <ArrowLeftIcon size={16} color="#9ca3af" className="transform rotate-180" />
            </button>
          ))}
        </div>

        {/* App Info */}
        <div className="bg-white px-4 py-4 text-center">
          <p className="text-sm text-gray-500 mb-2">Version 1.0.0</p>
          <p className="text-xs text-gray-400">
            Made with ❤️ by Zomato
          </p>
        </div>

        {/* Logout Button */}
        <div className="px-4 mt-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 font-medium py-4 rounded-lg border border-red-200"
            data-testid="button-logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
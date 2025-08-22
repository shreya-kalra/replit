import React, { useState } from 'react';
import { ArrowLeftIcon, StarIcon, TruckIcon } from '../../components/Icons';
import type { MainScreen } from '../../navigation/MainNavigator';

interface Order {
  id: string;
  restaurantName: string;
  restaurantImage: string;
  items: string[];
  totalAmount: number;
  orderDate: string;
  status: 'delivered' | 'preparing' | 'on-the-way' | 'cancelled';
  deliveryTime: string;
  rating?: number;
}

interface OrderHistoryScreenProps {
  onNavigate: (screen: MainScreen) => void;
}

const orders: Order[] = [
  {
    id: 'ORD001',
    restaurantName: 'Pizza Palace',
    restaurantImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop',
    items: ['Margherita Pizza', 'Garlic Bread'],
    totalAmount: 448,
    orderDate: '2024-01-20',
    status: 'delivered',
    deliveryTime: '28 min',
    rating: 4.5
  },
  {
    id: 'ORD002',
    restaurantName: 'Burger Barn',
    restaurantImage: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=300&h=200&fit=crop',
    items: ['Classic Burger', 'French Fries', 'Coke'],
    totalAmount: 385,
    orderDate: '2024-01-18',
    status: 'preparing',
    deliveryTime: '25 min'
  },
  {
    id: 'ORD003',
    restaurantName: 'Spice Garden',
    restaurantImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop',
    items: ['Chicken Biryani', 'Raita'],
    totalAmount: 299,
    orderDate: '2024-01-15',
    status: 'delivered',
    deliveryTime: '35 min',
    rating: 4.2
  },
  {
    id: 'ORD004',
    restaurantName: 'Sushi Central',
    restaurantImage: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop',
    items: ['California Roll', 'Salmon Sashimi'],
    totalAmount: 850,
    orderDate: '2024-01-12',
    status: 'cancelled',
    deliveryTime: '40 min'
  }
];

export const OrderHistoryScreen: React.FC<OrderHistoryScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'past'>('past');

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'preparing':
        return 'text-blue-600 bg-blue-100';
      case 'on-the-way':
        return 'text-orange-600 bg-orange-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'preparing':
        return 'Preparing';
      case 'on-the-way':
        return 'On the way';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const ongoingOrders = orders.filter(order => 
    order.status === 'preparing' || order.status === 'on-the-way'
  );
  
  const pastOrders = orders.filter(order => 
    order.status === 'delivered' || order.status === 'cancelled'
  );

  const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
    <div className="bg-white p-4 border-b border-gray-100" data-testid={`order-${order.id}`}>
      <div className="flex-row items-start justify-between mb-3">
        <div className="flex-row items-center flex-1">
          <img 
            src={order.restaurantImage} 
            alt={order.restaurantName}
            className="w-16 h-16 rounded-lg object-cover mr-4"
          />
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {order.restaurantName}
            </h3>
            <p className="text-gray-600 text-sm mb-1">
              {order.items.join(', ')}
            </p>
            <p className="text-gray-500 text-xs">
              {new Date(order.orderDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
          {getStatusText(order.status)}
        </div>
      </div>

      <div className="flex-row items-center justify-between">
        <div className="flex-row items-center">
          <span className="font-semibold text-gray-900 mr-4">₹{order.totalAmount}</span>
          <span className="text-gray-600 text-sm">• {order.deliveryTime}</span>
        </div>

        <div className="flex-row items-center">
          {order.status === 'delivered' && (
            <>
              {order.rating ? (
                <div className="flex-row items-center mr-4">
                  <StarIcon size={14} color="#fbbf24" filled />
                  <span className="ml-1 text-sm font-medium">{order.rating}</span>
                </div>
              ) : (
                <button className="text-zomato text-sm font-medium mr-4">
                  Rate Order
                </button>
              )}
            </>
          )}
          
          {order.status === 'preparing' || order.status === 'on-the-way' ? (
            <button 
              className="text-zomato text-sm font-medium"
              data-testid={`button-track-${order.id}`}
            >
              Track Order
            </button>
          ) : (
            <button 
              className="text-zomato text-sm font-medium"
              data-testid={`button-reorder-${order.id}`}
            >
              Reorder
            </button>
          )}
        </div>
      </div>

      {(order.status === 'preparing' || order.status === 'on-the-way') && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex-row items-center">
            <TruckIcon size={16} color="#2563eb" />
            <span className="ml-2 text-blue-700 text-sm font-medium">
              {order.status === 'preparing' 
                ? 'Your order is being prepared' 
                : 'Your order is on the way'
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="safe-area-top bg-zomato px-4 py-6">
        <div className="flex-row items-center">
          <button
            onClick={() => onNavigate('home')}
            className="mr-4 p-2"
            data-testid="button-back"
          >
            <ArrowLeftIcon size={24} color="white" />
          </button>
          <h1 className="text-white text-xl font-semibold">Your Orders</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex-row">
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'ongoing' 
                ? 'text-zomato border-b-2 border-zomato' 
                : 'text-gray-600'
            }`}
            data-testid="tab-ongoing"
          >
            Ongoing ({ongoingOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'past' 
                ? 'text-zomato border-b-2 border-zomato' 
                : 'text-gray-600'
            }`}
            data-testid="tab-past"
          >
            Past Orders ({pastOrders.length})
          </button>
        </div>
      </div>

      {/* Order List */}
      <div className="flex-1 pb-20">
        {activeTab === 'ongoing' ? (
          ongoingOrders.length > 0 ? (
            ongoingOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-16 px-4">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No ongoing orders
              </h3>
              <p className="text-gray-600 mb-6">
                When you place an order, you'll see it here
              </p>
              <button
                onClick={() => onNavigate('home')}
                className="btn btn-primary"
                data-testid="button-browse-restaurants"
              >
                Browse Restaurants
              </button>
            </div>
          )
        ) : (
          pastOrders.length > 0 ? (
            pastOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-16 px-4">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No past orders
              </h3>
              <p className="text-gray-600 mb-6">
                Your order history will appear here
              </p>
              <button
                onClick={() => onNavigate('home')}
                className="btn btn-primary"
                data-testid="button-order-now"
              >
                Order Now
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
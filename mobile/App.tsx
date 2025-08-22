import React, { useState, useEffect } from 'react';
import { AuthStack } from './src/navigation/AuthStack';
import { MainNavigator } from './src/navigation/MainNavigator';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { SafeAreaProvider } from './src/components/SafeAreaProvider';
import './src/styles/global.css';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex-1 justify-center items-center bg-white">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <div className="mt-4 text-gray-600">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <MainNavigator /> : <AuthStack />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
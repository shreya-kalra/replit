import React from 'react';

interface SafeAreaProviderProps {
  children: React.ReactNode;
}

export const SafeAreaProvider: React.FC<SafeAreaProviderProps> = ({ children }) => {
  return (
    <div className="mobile-container">
      {children}
    </div>
  );
};
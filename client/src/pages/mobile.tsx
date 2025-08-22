import React from 'react';

// Import the mobile app components
import MobileApp from '@/mobile/App';

export default function Mobile() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <MobileApp />
      </div>
    </div>
  );
}
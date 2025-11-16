import React from 'react';
import { User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Gangadhar K</h1>
              <p className="text-sm text-gray-500">AI/ML Engineer</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

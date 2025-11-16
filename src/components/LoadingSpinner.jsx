import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = 'Processing...' }) => {
  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />
      <span className="text-sm text-gray-600">{message}</span>
    </div>
  );
};

export default LoadingSpinner;

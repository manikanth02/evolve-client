import React from 'react';
import { Compass } from 'lucide-react';

export const LoadingIndicator = ({ text = 'Loading wisdom and programmes...' }) => {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-forest-700 border-t-gold-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Compass className="w-5 h-5 text-gold-400/70" />
        </div>
      </div>
      <p className="text-sm font-medium text-cream-200/70 animate-pulse tracking-wide">
        {text}
      </p>
    </div>
  );
};

import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from './Button';

export const ErrorMessage = ({
  message = 'Unable to load content right now. Please try again.',
  onRetry
}) => {
  return (
    <div className="py-12 px-6 rounded-2xl bg-forest-900/40 border border-red-500/30 text-center max-w-lg mx-auto flex flex-col items-center">
      <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h4 className="font-serif text-lg font-semibold text-cream-50 mb-1">
        Notice
      </h4>
      <p className="text-sm text-cream-200/80 mb-4">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm" icon={RotateCcw}>
          Try Again
        </Button>
      )}
    </div>
  );
};

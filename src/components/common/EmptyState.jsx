import React from 'react';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = Compass,
  title = 'No records found yet',
  description = 'We are currently compiling verified records and authentic participant experiences.',
  actionText,
  actionTo,
  actionOnClick,
  className = ''
}) => {
  return (
    <div className={`text-center py-12 px-6 rounded-3xl bg-forest-900/40 border border-gold-500/20 max-w-2xl mx-auto flex flex-col items-center justify-center ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-forest-900 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-5 shadow-gold-glow">
        <Icon className="w-7 h-7" />
      </div>

      <h3 className="font-serif text-2xl font-bold text-cream-50 mb-3">
        {title}
      </h3>

      <p className="text-sm sm:text-base text-cream-200/80 max-w-lg mb-6 leading-relaxed">
        {description}
      </p>

      {actionText && (actionTo || actionOnClick) && (
        <Button
          to={actionTo}
          onClick={actionOnClick}
          variant="gold"
          size="sm"
          icon={ArrowRight}
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};

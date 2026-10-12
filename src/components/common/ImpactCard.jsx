import React from 'react';
import { Award, TrendingUp, Calendar } from 'lucide-react';

export const ImpactCard = ({ metric }) => {
  const { label, value, description, reportingPeriod } = metric;

  return (
    <div className="bg-forest-900/60 border border-gold-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-gold-400/60 transition-all duration-300 hover:shadow-gold-glow">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          {reportingPeriod && (
            <span className="flex items-center gap-1 text-[11px] font-mono text-cream-200/60 uppercase">
              <Calendar className="w-3 h-3 text-gold-400" />
              {reportingPeriod}
            </span>
          )}
        </div>

        <div className="font-serif text-4xl sm:text-5xl font-bold gold-text-gradient mb-2 tracking-tight">
          {value}
        </div>

        <h4 className="font-serif text-lg font-semibold text-cream-50 mb-2">
          {label}
        </h4>

        {description && (
          <p className="text-sm text-cream-200/70 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-forest-800 text-[11px] font-mono text-gold-400/80 flex items-center gap-1.5">
        <Award className="w-3.5 h-3.5" />
        <span>Verified Field Record</span>
      </div>
    </div>
  );
};

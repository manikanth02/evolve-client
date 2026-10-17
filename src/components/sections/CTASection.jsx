import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { Button } from '../common/Button';

export const CTASection = ({
  badge = 'Begin Your Evolution',
  title = 'Every Great Transformation Begins Within.',
  subtitle = 'Whether you are a student seeking direction, a young professional seeking focus, or an organisation seeking purposeful leadership, Evolve Club welcomes you.',
  primaryCtaText = 'Explore Our Programmes',
  primaryCtaTo = '/programmes',
  secondaryCtaText = 'Get Involved',
  secondaryCtaTo = '/get-involved'
}) => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-forest-950 via-forest-900 to-forest-950 overflow-hidden border-t border-gold-500/20">
      {/* Ambient background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{badge}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-50 tracking-tight max-w-3xl mx-auto leading-tight">
          {title}
        </h2>

        <p className="text-base sm:text-lg text-cream-200/80 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            to={primaryCtaTo}
            variant="gold"
            size="lg"
            icon={ArrowRight}
          >
            {primaryCtaText}
          </Button>

          <Button
            to={secondaryCtaTo}
            variant="outline"
            size="lg"
          >
            {secondaryCtaText}
          </Button>
        </div>

        <p className="text-xs text-cream-200/40 uppercase tracking-widest pt-4">
          LEARN · GROW · SERVE · LEAD
        </p>
      </div>
    </section>
  );
};

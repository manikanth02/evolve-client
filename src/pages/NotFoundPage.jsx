import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home, Sparkles } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-forest-950 text-cream-50 flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md mx-auto text-center relative z-10 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-forest-900 border border-gold-500/40 flex items-center justify-center mx-auto text-gold-400 shadow-gold-glow">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '12s' }} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
            Error 404 · Path Diverged
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream-50">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-cream-200/80 leading-relaxed">
            "Even when an arrow veers off course, the archer simply realigns their vision." The destination you are searching for does not exist or has moved.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            to="/"
            variant="gold"
            size="md"
            icon={Home}
          >
            Return to Homepage
          </Button>

          <Button
            to="/programmes"
            variant="outline"
            size="md"
          >
            Explore Programmes
          </Button>
        </div>

        <p className="text-xs font-mono text-cream-200/40 uppercase tracking-widest pt-8">
          EVOLVE CLUB · LEARN · GROW · SERVE · LEAD
        </p>
      </div>
    </div>
  );
};

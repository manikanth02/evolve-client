import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Users, Clock, Sparkles } from 'lucide-react';

export const ProgrammeCard = ({ programme }) => {
  const {
    title,
    slug,
    shortDescription,
    category,
    image,
    deliveryFormats = []
  } = programme;

  return (
    <div className="group flex flex-col bg-forest-900/60 hover:bg-forest-900 border border-forest-700/50 hover:border-gold-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-gold-glow flex-1">
      {/* Image container */}
      <div className="relative h-48 w-full overflow-hidden bg-forest-950">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-forest-950">
            <Compass className="w-12 h-12 text-gold-400/40" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-forest-950/90 text-gold-400 border border-gold-500/30 backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2.5">
          <h3 className="font-serif text-xl font-bold text-cream-50 group-hover:text-gold-300 transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-sm text-cream-200/80 line-clamp-3 leading-relaxed">
            {shortDescription}
          </p>
        </div>

        {/* Formats and CTA */}
        <div className="pt-4 border-t border-forest-800 space-y-4">
          {deliveryFormats.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {deliveryFormats.map((fmt, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2.5 py-0.5 rounded-md bg-forest-950/80 text-cream-200/70 border border-forest-800"
                >
                  {fmt}
                </span>
              ))}
            </div>
          )}

          <Link
            to={`/programmes/${slug}`}
            className="inline-flex items-center justify-between w-full text-sm font-semibold text-gold-400 hover:text-gold-300 pt-1 group/btn"
          >
            <span>View Programme Curriculum</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

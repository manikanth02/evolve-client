import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserCheck, Sparkles } from 'lucide-react';

export const SpeakerCard = ({ speaker }) => {
  const [imgError, setImgError] = useState(false);

  if (!speaker) return null;

  return (
    <article className="bg-white rounded-3xl overflow-hidden border border-gold-500/25 shadow-sm hover:shadow-xl hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between group active:scale-[0.99]">
      <div>
        {/* Profile Image - Optimized aspect ratio for mobile viewports */}
        <Link
          to={`/speakers/${speaker.slug}`}
          className="block relative aspect-[4/5] sm:aspect-square w-full overflow-hidden bg-forest-950 cursor-pointer"
          aria-label={`View profile of ${speaker.name}`}
        >
          {!imgError ? (
            <img
              src={speaker.image}
              alt={`Portrait of ${speaker.name}`}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gold-400/60 p-6 text-center">
              <UserCheck className="w-16 h-16 mb-2 text-gold-400/40" />
              <span className="text-xs uppercase tracking-wider font-mono text-cream-200/60">
                {speaker.name}
              </span>
            </div>
          )}
          
          {/* Subtle gradient vignette at bottom of image */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent opacity-75" />
          
          {/* Mobile Badge */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-cream-100 font-mono">
            <span className="px-3 py-1 rounded-full bg-forest-950/90 text-gold-400 border border-gold-500/35 backdrop-blur-md text-[11px] font-medium shadow-sm">
              {speaker.primaryRole || 'Mentor & Speaker'}
            </span>
          </div>
        </Link>

        {/* Card Content - Generous touch & readable scale for mobile */}
        <div className="p-5 sm:p-6 space-y-3">
          <Link to={`/speakers/${speaker.slug}`} className="block group-hover:text-gold-600 transition-colors">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-950 leading-tight">
              {speaker.name}
            </h3>
          </Link>

          {/* Designation - Allowed 2 lines so full credentials show on phones */}
          <p className="text-xs font-semibold text-gold-600 uppercase tracking-wider leading-snug line-clamp-2">
            {speaker.designation}
          </p>

          <p className="text-sm text-forest-800/85 leading-relaxed line-clamp-3 sm:line-clamp-4 font-light">
            {speaker.shortBio}
          </p>

          {/* Expertise Badges */}
          {speaker.expertise && speaker.expertise.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {speaker.expertise.slice(0, 3).map((exp, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-forest-900/5 text-forest-800 border border-forest-900/10"
                >
                  {exp}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Action - Large touch target for 98% mobile users */}
      <div className="p-5 sm:p-6 pt-0 border-t border-cream-200/80 mt-2">
        <div className="pt-3">
          <Link
            to={`/speakers/${speaker.slug}`}
            className="w-full py-2.5 px-4 rounded-xl bg-forest-900/5 hover:bg-forest-900 text-forest-900 hover:text-gold-400 border border-forest-900/15 hover:border-gold-500/40 text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 min-h-[44px]"
          >
            <span>View Profile & Gallery</span>
            <ArrowRight className="w-4 h-4 text-gold-600 group-hover:text-gold-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};

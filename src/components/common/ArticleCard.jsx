import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, ArrowRight, Calendar } from 'lucide-react';

export const ArticleCard = ({ article }) => {
  const {
    title,
    slug,
    excerpt,
    category,
    verseReference,
    image,
    publishedAt,
    readTime,
    author
  } = article;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-GB', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : null;

  // Strip raw markdown formatting symbols from card excerpts for clean preview
  const cleanExcerpt = excerpt ? excerpt.replace(/[*#_`~>]/g, '').trim() : '';

  return (
    <Link
      to={`/wisdom-hub/${slug}`}
      className="group flex flex-col bg-forest-900/50 hover:bg-forest-900/80 border border-forest-700/50 hover:border-gold-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-gold-glow flex-1 cursor-pointer h-full"
    >
      {/* Visual Header with Ambient Backdrop and Uncropped Artwork */}
      <div className="relative h-44 sm:h-64 w-full overflow-hidden bg-forest-950 flex items-center justify-center">
        {image ? (
          <>
            {/* Ambient Blurred Backdrop to avoid empty bars */}
            <div
              className="absolute inset-0 bg-cover bg-center blur-xl opacity-35 scale-110 pointer-events-none"
              style={{ backgroundImage: `url("${image}")` }}
            />
            {/* Full uncropped artwork */}
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain p-2 group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-forest-950">
            <BookOpen className="w-10 h-10 text-gold-400/40" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent pointer-events-none" />

        {/* Category Badge */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20">
          <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-forest-950/90 text-gold-400 border border-gold-500/30 backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-6 flex flex-col flex-1 justify-between space-y-3 sm:space-y-4">
        <div className="space-y-2 sm:space-y-3">
          {verseReference && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-gold-400 font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{verseReference}</span>
            </div>
          )}

          <h3 className="font-serif text-lg sm:text-xl font-bold text-cream-50 group-hover:text-gold-300 transition-colors leading-snug line-clamp-2">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-cream-200/80 line-clamp-3 leading-relaxed font-light">
            {cleanExcerpt}
          </p>
        </div>

        {/* Footer meta & clear Read Article link */}
        <div className="pt-3 sm:pt-4 border-t border-forest-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-cream-200/60">
            {formattedDate && (
              <div className="hidden sm:flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </div>
            )}
            {readTime && <span>{readTime}</span>}
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gold-400 group-hover:text-gold-300 transition-colors ml-auto">
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;

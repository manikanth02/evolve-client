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
    publishedAt
  } = article;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-GB', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : null;

  return (
    <article className="group flex flex-col bg-forest-900/50 hover:bg-forest-900/80 border border-forest-700/50 hover:border-gold-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-gold-glow flex-1">
      {/* Visual Header */}
      <div className="relative h-48 w-full overflow-hidden bg-forest-950">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-forest-950">
            <BookOpen className="w-10 h-10 text-gold-400/40" />
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

      {/* Body Content */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-3">
          {verseReference && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-gold-400 font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{verseReference}</span>
            </div>
          )}

          <h3 className="font-serif text-xl font-bold text-cream-50 group-hover:text-gold-300 transition-colors leading-snug">
            {title}
          </h3>

          <p className="text-sm text-cream-200/80 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        </div>

        {/* Footer meta & read link */}
        <div className="pt-4 border-t border-forest-800 flex items-center justify-between">
          {formattedDate && (
            <div className="flex items-center gap-1 text-xs text-cream-200/50">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
          )}

          <Link
            to={`/wisdom-hub/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors ml-auto group/link"
          >
            <span>Read Reflection</span>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};

import React from 'react';

export const SectionHeading = ({
  badge,
  title,
  highlightWord,
  subtitle,
  align = 'center', // 'center', 'left', 'right'
  theme = 'dark', // 'dark', 'light'
  className = ''
}) => {
  const alignClass = {
    center: 'text-center mx-auto items-center',
    left: 'text-left items-start',
    right: 'text-right items-end'
  }[align] || 'text-center mx-auto items-center';

  return (
    <div className={`flex flex-col max-w-3xl ${alignClass} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-2.5 sm:mb-3.5 border transition-all duration-300 backdrop-blur-sm bg-gold-500/10 border-gold-500/30 text-gold-400">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span>{badge}</span>
        </div>
      )}

      {title && (
        <h2 className={`font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-3 sm:mb-4 ${
          theme === 'dark' ? 'text-cream-50' : 'text-forest-950'
        }`}>
          {title}
          {highlightWord && (
            <span className="block mt-1 font-serif gold-text-gradient">
              {highlightWord}
            </span>
          )}
        </h2>
      )}

      {subtitle && (
        <p className={`text-xs sm:text-base lg:text-lg leading-relaxed ${
          theme === 'dark' ? 'text-cream-200/80' : 'text-forest-800/80'
        } ${align === 'center' ? 'max-w-2xl' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}

      {/* Decorative accent divider */}
      <div className={`mt-3.5 sm:mt-5 flex items-center gap-1.5 sm:gap-2 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="h-[2px] w-6 sm:w-8 rounded-full bg-gold-500/40"></span>
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400"></span>
        <span className="h-[2px] w-6 sm:w-8 rounded-full bg-gold-500/40"></span>
      </div>
    </div>
  );
};

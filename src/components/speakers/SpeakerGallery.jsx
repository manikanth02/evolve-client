import React, { useState, useEffect } from 'react';
import { MapPin, Camera, X, ZoomIn } from 'lucide-react';

export const SpeakerGallery = ({ items = [], speakerName = 'Speaker' }) => {
  const [activePhoto, setActivePhoto] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePhoto(null);
    };
    if (activePhoto) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent background scrolling while modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activePhoto]);

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold-700 font-bold">
          <Camera className="w-4 h-4 text-gold-600" />
          <span>Real Session & Seminar Photographs</span>
        </div>
        <span className="text-[11px] font-mono text-forest-800/60 hidden sm:inline">
          Tap photo to enlarge
        </span>
      </div>

      {/* Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setActivePhoto(item)}
            className="group relative rounded-2xl overflow-hidden border border-gold-500/25 bg-forest-950 aspect-[4/3] flex flex-col justify-end shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
          >
            <img
              src={item.url}
              alt={item.caption || `Seminar photograph of ${speakerName}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Always visible gradient so text is readable on mobile without hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/40 to-transparent" />

            {/* Tap zoom icon hint on mobile/desktop */}
            <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-forest-950/70 backdrop-blur-sm border border-gold-500/30 flex items-center justify-center text-gold-400 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3.5 h-3.5" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 p-3.5 sm:p-4 space-y-1">
              {item.location && (
                <div className="flex items-center gap-1 text-[11px] font-mono text-gold-300 font-medium">
                  <MapPin className="w-3 h-3 text-gold-400 shrink-0" />
                  <span className="line-clamp-1">{item.location}</span>
                </div>
              )}
              {item.caption && (
                <p className="text-xs text-cream-100 leading-snug font-light line-clamp-2">
                  {item.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Friendly Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-forest-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button with high-contrast touch target */}
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-forest-900 text-gold-400 hover:text-cream-50 border border-gold-500/40 z-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl border border-gold-500/30 shadow-2xl bg-forest-900">
              <img
                src={activePhoto.url}
                alt={activePhoto.caption || 'Enlarged photo'}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Photo details */}
            <div className="text-center px-4 space-y-1">
              {activePhoto.location && (
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-gold-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activePhoto.location}</span>
                </div>
              )}
              {activePhoto.caption && (
                <p className="text-sm text-cream-100 font-light max-w-2xl mx-auto leading-relaxed">
                  {activePhoto.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

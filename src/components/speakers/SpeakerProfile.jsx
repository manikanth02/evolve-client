import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Award, Calendar, BookOpen, Send, UserCheck, Sparkles, Building2, Target } from 'lucide-react';
import { SpeakerGallery } from './SpeakerGallery';
import { Button } from '../common/Button';

export const SpeakerProfile = ({ speaker }) => {
  const [imgError, setImgError] = useState(false);

  if (!speaker) return null;

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Top Profile Card - Mobile Optimized Padding & Flow */}
      <div className="bg-white p-5 sm:p-8 lg:p-12 rounded-3xl border border-gold-500/30 shadow-lg grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Portrait */}
        <div className="md:col-span-5 lg:col-span-4 space-y-4">
          <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-2xl overflow-hidden bg-forest-950 border border-gold-500/30 shadow-md">
            {!imgError ? (
              <img
                src={speaker.image}
                alt={`Portrait of ${speaker.name}`}
                loading="eager"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gold-400 p-6 text-center">
                <UserCheck className="w-16 h-16 sm:w-20 sm:h-20 mb-2 opacity-50" />
                <span className="text-xs font-mono uppercase tracking-wider">{speaker.name}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-50 pointer-events-none" />
          </div>

          {/* Facilitator Verification Badge */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-cream-100/90 border border-gold-500/25 text-xs text-forest-800 space-y-1">
            <span className="font-mono uppercase font-bold text-gold-600 block flex items-center gap-1.5 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              Verified Evolve Mentor
            </span>
            <p className="leading-relaxed text-forest-850">
              Active mentor conducting youth cohorts, seminars, and leadership workshops.
            </p>
          </div>
        </div>

        {/* Right Column: Name, Designation, Bio */}
        <div className="md:col-span-7 lg:col-span-8 space-y-5 sm:space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider bg-gold-500/10 text-gold-700 border border-gold-500/30 font-semibold">
              <Sparkles className="w-3 h-3 text-gold-600" />
              <span>{speaker.primaryRole || 'Mentor & Speaker Profile'}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-forest-950 leading-tight">
              {speaker.name}
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-gold-600 uppercase tracking-wide leading-relaxed">
              {speaker.designation}
            </p>
          </div>

          {/* Expertise Tags */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-forest-700/70 font-bold block">
              Core Areas of Expertise
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {speaker.expertise?.map((exp, idx) => (
                <span
                  key={idx}
                  className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium bg-forest-900 text-cream-50 shadow-xs"
                >
                  {exp}
                </span>
              ))}
            </div>
          </div>

          {/* Full Biography */}
          <div className="space-y-3 pt-2 border-t border-cream-200/80">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-forest-700/70 font-bold block">
              Biography & Background
            </span>
            <div className="text-forest-800/90 text-sm sm:text-base leading-relaxed space-y-3 font-light">
              {speaker.fullBio.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Detailed Expertise Breakdown (If available) */}
          {speaker.expertiseSections && speaker.expertiseSections.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-cream-200/80">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-gold-700 font-bold flex items-center gap-1.5">
                <Target className="w-4 h-4 text-gold-600" />
                <span>Specialized Domains</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {speaker.expertiseSections.map((sec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-cream-50 border border-gold-500/20 space-y-1"
                  >
                    <h4 className="text-xs font-bold text-forest-950 font-serif">
                      {sec.title}
                    </h4>
                    <p className="text-[11px] text-forest-800/80 leading-relaxed font-light">
                      {sec.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Institutions Engaged (Categorized if available) */}
          {speaker.institutionsEngaged && speaker.institutionsEngaged.length > 0 ? (
            <div className="space-y-3 pt-3 border-t border-cream-200/80">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-forest-900 font-bold flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-gold-600" />
                <span>Institutions & Audiences Engaged</span>
              </span>
              <div className="grid grid-cols-1 gap-2">
                {speaker.institutionsEngaged.map((cat, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-3 rounded-xl bg-cream-50 border border-cream-200 text-xs text-forest-900 space-y-0.5"
                  >
                    <span className="font-semibold text-gold-700 font-mono text-[11px] uppercase block">
                      {cat.category}
                    </span>
                    <p className="text-forest-800/90 text-xs leading-relaxed">
                      {cat.institutes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Verified Engagements fallback */
            speaker.engagements && speaker.engagements.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-cream-200/80">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-gold-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-600" />
                  <span>Key Engagements & Platforms</span>
                </span>
                <ul className="grid grid-cols-1 gap-2">
                  {speaker.engagements.map((eng, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-forest-900 bg-cream-50 p-2.5 rounded-xl border border-cream-200 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{eng}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}

          {/* Action CTAs - Full-width stacked on mobile for thumb taps */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              to={`/get-involved?interest=Mentorship&mentor=${encodeURIComponent(speaker.name)}`}
              variant="gold"
              size="md"
              icon={Send}
              className="w-full sm:w-auto justify-center text-center min-h-[46px]"
            >
              Connect or Request Session
            </Button>
            <Button
              to="/speakers"
              variant="outline"
              size="md"
              icon={ArrowLeft}
              className="w-full sm:w-auto justify-center text-center min-h-[46px]"
            >
              Back to Our Speakers
            </Button>
          </div>
        </div>
      </div>

      {/* Real Event & Seminar Photography Gallery */}
      {speaker.gallery && speaker.gallery.length > 0 && (
        <div className="bg-white p-5 sm:p-8 lg:p-12 rounded-3xl border border-gold-500/20 shadow-sm">
          <SpeakerGallery items={speaker.gallery} speakerName={speaker.name} />
        </div>
      )}
    </div>
  );
};

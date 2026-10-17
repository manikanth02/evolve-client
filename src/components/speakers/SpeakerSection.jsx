import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { SpeakerCard } from './SpeakerCard';
import { getPublishedSpeakers } from '../../data/speakers';
import { AnimatedSection } from '../animations/AnimatedSection';

export const SpeakerSection = ({
  badge = 'Our Facilitators & Mentors',
  title = 'Guiding Minds With',
  highlightWord = 'Wisdom & Empathy',
  subtitle = 'Experienced educators, researchers, and coaches dedicated to youth leadership, emotional composure, and values-based action.'
}) => {
  const speakers = getPublishedSpeakers();

  if (!speakers || speakers.length === 0) return null;

  return (
    <section id="speakers" className="py-12 sm:py-20 bg-cream-50 border-t border-gold-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={badge}
          title={title}
          highlightWord={highlightWord}
          subtitle={subtitle}
          theme="light"
          align="center"
        />

        <div className="mt-8 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {speakers.map((speaker, idx) => (
            <AnimatedSection key={speaker.id} delay={idx * 0.1}>
              <SpeakerCard speaker={speaker} />
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center flex flex-col items-center gap-3">
          <Link
            to="/speakers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-forest-900 text-gold-400 hover:bg-forest-950 font-semibold text-xs sm:text-sm uppercase tracking-wider border border-gold-500/30 transition-all shadow-md active:scale-95"
          >
            <span>Explore All Speakers & Engagements</span>
            <ArrowRight className="w-4 h-4 text-gold-400" />
          </Link>
          <p className="text-[11px] sm:text-xs text-forest-800/60 font-mono">
            All facilitators lead through authentic practice, ethical mentorship, and verified institutional experience.
          </p>
        </div>
      </div>
    </section>
  );
};

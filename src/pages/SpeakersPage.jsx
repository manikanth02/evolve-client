import React, { useEffect } from 'react';
import { Compass, Sparkles, Users, Award, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { SpeakerCard } from '../components/speakers/SpeakerCard';
import { getPublishedSpeakers } from '../data/speakers';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { CTASection } from '../components/sections/CTASection';
import { Button } from '../components/common/Button';

export const SpeakersPage = () => {
  const speakers = getPublishedSpeakers();

  useEffect(() => {
    document.title = 'Our Speakers & Mentors | Evolve Club';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-cream-50 text-forest-950 pt-20 sm:pt-24 pb-12">
      {/* Header Banner - Responsive for Mobile Viewports */}
      <section className="bg-forest-950 text-cream-50 py-12 sm:py-20 relative overflow-hidden border-b border-gold-500/20">
        <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400">
            <Users className="w-3.5 h-3.5" />
            <span>Mentors · Researchers · Leadership Coaches</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50 leading-tight">
            Our <span className="gold-text-gradient">Speakers & Mentors</span>
          </h1>

          <p className="text-sm sm:text-lg text-cream-200/90 max-w-3xl mx-auto font-light leading-relaxed">
            Meet the researchers, educators, and mentors leading Evolve Club's campus seminars, leadership masterclasses, mind management cohorts, and youth dialogues.
          </p>
        </div>
      </section>

      {/* Guiding Principles for Facilitators */}
      <section className="py-8 sm:py-12 bg-cream-100 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gold-500/20 shadow-sm flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-forest-950">
                  Lead by Example
                </h4>
                <p className="text-xs text-forest-800/80 mt-1 leading-relaxed">
                  Every mentor actively lives the principles of self-regulation, mental poise, and ethical service that they teach.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gold-500/20 shadow-sm flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-forest-950">
                  Inquiry Over Dogma
                </h4>
                <p className="text-xs text-forest-800/80 mt-1 leading-relaxed">
                  Facilitating open inquiry where students examine mental triggers, ask tough questions, and discover inner anchors.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gold-500/20 shadow-sm flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-forest-950">
                  Values & Seva
                </h4>
                <p className="text-xs text-forest-800/80 mt-1 leading-relaxed">
                  Anchoring modern ambitions in timeless ethics, character building, and humble contribution to society.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Grid */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Mentors & Speakers"
          title="Guiding Minds With"
          highlightWord="Wisdom & Empathy"
          subtitle="Explore our active speakers and mentors. Tap 'View Profile & Gallery' to read their verified engagements, expertise domains, and session photography."
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

        {/* Note on Facilitator Sessions */}
        <div className="mt-12 sm:mt-16 max-w-3xl mx-auto bg-forest-900 text-cream-100 p-6 sm:p-8 rounded-3xl border border-gold-500/30 text-center space-y-4 shadow-forest-deep">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream-50">
            Invite a Speaker to Your Campus or Organisation
          </h3>
          <p className="text-xs sm:text-sm text-cream-200/80 leading-relaxed font-light">
            Our speakers conduct interactive workshops on AI ethics, cyber threat awareness, emotional intelligence, and conscious leadership across top IITs, NITs, premier universities, and corporate forums.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Button
              to="/get-involved?interest=Institutional+Collaboration"
              variant="gold"
              size="md"
              icon={ArrowRight}
              className="w-full sm:w-auto justify-center text-center min-h-[46px]"
            >
              Request Institutional Workshop
            </Button>
            <Button
              to="/get-involved?interest=Mentorship"
              variant="outline"
              size="md"
              className="w-full sm:w-auto justify-center text-center min-h-[46px]"
            >
              Connect for Mentorship
            </Button>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <CTASection
        badge="Join The Movement"
        title="Experience Practical Wisdom in Action"
        subtitle="Step into an upcoming youth cohort, dialogue circle, or campus session led by our mentors."
        primaryCtaText="Get Involved"
        primaryCtaTo="/get-involved"
        secondaryCtaText="Explore Programmes"
        secondaryCtaTo="/programmes"
      />
    </div>
  );
};

export default SpeakersPage;

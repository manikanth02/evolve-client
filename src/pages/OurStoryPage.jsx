import React from 'react';
import { Compass, Sparkles, Target, Eye, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { CTASection } from '../components/sections/CTASection';
import { Button } from '../components/common/Button';

export const OurStoryPage = () => {
  const values = [
    {
      title: 'Integrity First',
      desc: 'Inner harmony between thoughts, speech, and actions. Living honestly even when unobserved.',
      icon: ShieldCheck
    },
    {
      title: 'Continuous Evolution',
      desc: 'Approaching life as a laboratory for conscious learning and growth (Abhyasa).',
      icon: Sparkles
    },
    {
      title: 'Compassionate Service',
      desc: 'Grounding ambition in the selfless upliftment of peers, family, and society (Seva).',
      icon: Heart
    },
    {
      title: 'Equanimity in Action',
      desc: 'Maintaining composure (Samatva) across triumphs and tribulations, anchored in higher duty.',
      icon: Compass
    }
  ];

  const milestones = [
    {
      stage: 'Phase I',
      title: 'The Inception & The Need',
      desc: 'Observing the growing crisis of attention, digital anxiety, and lack of values-based mentorship among students and young professionals.',
      highlight: 'Identifying Core Needs'
    },
    {
      stage: 'Phase II',
      title: 'Philosophical Architecture',
      desc: 'Synthesizing the practical, psychological frameworks of the Bhagavad Gita into experiential modules for character building, leadership, and mental hygiene.',
      highlight: 'Creating Curriculum'
    },
    {
      stage: 'Phase III',
      title: 'Interactive Pilot Circles',
      desc: 'Hosting interactive discussion circles, reflection spaces, and campus workshops across Chandigarh and Mohali to test and refine teaching methodologies.',
      highlight: 'Groundwork & Dialogue'
    },
    {
      stage: 'Phase IV',
      title: 'Expanding The Movement',
      desc: 'Structuring sustainable cohorts, corporate sessions, and community service drives to cultivate a generation of grounded, purposeful leaders.',
      highlight: 'Lasting Transformation'
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50 text-forest-950 pt-24">
      {/* Header Banner */}
      <section className="bg-forest-950 text-cream-50 py-20 relative overflow-hidden border-b border-gold-500/20">
        <div className="absolute inset-0 bg-grain opacity-25" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400">
            <Compass className="w-3.5 h-3.5" />
            <span>Our Origins & Ethos</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50">
            Why We Founded <span className="gold-text-gradient">Evolve Club</span>
          </h1>

          <p className="text-lg sm:text-xl text-cream-200/90 max-w-3xl mx-auto font-light leading-relaxed">
            An independent youth empowerment movement dedicated to helping young minds cultivate character, clarity, and compassionate leadership.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <AnimatedSection className="bg-white p-8 sm:p-10 rounded-3xl border border-gold-500/30 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-forest-950">
                Our Mission
              </h3>
              <p className="text-base text-forest-800/80 leading-relaxed">
                To empower young individuals with practical wisdom, mental discipline, and ethical grounding, enabling them to make conscious choices, lead purposeful lives, and make meaningful contributions to society.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-cream-200 text-xs font-mono uppercase tracking-widest text-gold-600 font-semibold">
              LEARN · GROW · SERVE · LEAD
            </div>
          </AnimatedSection>

          {/* Vision */}
          <AnimatedSection delay={0.15} className="bg-forest-900 text-cream-50 p-8 sm:p-10 rounded-3xl border border-gold-500/40 shadow-forest-deep flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/20 text-gold-400 border border-gold-500/40 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-cream-50">
                Our Vision
              </h3>
              <p className="text-base text-cream-200/90 leading-relaxed">
                A generation of resilient, thoughtful leaders who possess both sharp intellectual competence and profound inner peace—leading not by domination, but by virtue, empathy, and service.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-forest-800 text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold">
              Purposeful Living & Lasting Transformation
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Evolve Club Exists & Personal Growth Philosophy */}
      <section className="py-20 bg-cream-100 border-y border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Philosophy"
            title="Why Evolve Club Exists"
            highlightWord="The Inner Architecture of Growth"
            subtitle="Modern education excels at teaching young people what to learn and how to compete, but often overlooks how to manage the mind, handle setbacks, and discover purpose."
            theme="light"
            align="center"
          />

          <div className="mt-14 max-w-4xl mx-auto space-y-6 text-forest-900/90 text-base sm:text-lg leading-relaxed bg-white p-8 sm:p-12 rounded-3xl border border-cream-300 shadow-sm">
            <p>
              Youth is the most energetic, formative phase of human life. Yet today, young people face unprecedented challenges: algorithmic addiction, constant comparison on social platforms, existential confusion, and overwhelming anxiety about outcomes.
            </p>
            <p>
              Evolve Club was conceived to bridge this vital gap. Rather than offering superficial motivational slogans or temporary fixes, we turn to the perennial psychological science of the <strong>Bhagavad Gita</strong>.
            </p>
            <p>
              We view character development not as moral preaching, but as cognitive freedom: learning to direct one’s senses rather than being dragged by them, finding joy in diligent action rather than paralyzing anxiety over verdicts, and discovering true fulfillment in <strong>Seva</strong> (selfless service).
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Guiding Principles"
          title="Our Core Values"
          subtitle="The moral foundation that anchors every workshop, dialogue circle, and community initiative."
          theme="light"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <AnimatedSection
                key={i}
                delay={i * 0.1}
                className="bg-white p-6 rounded-2xl border border-gold-500/20 hover:border-gold-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-forest-950 mb-2">
                    {v.title}
                  </h4>
                  <p className="text-sm text-forest-800/80 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* Visual Roadmap / Timeline of Journey */}
      <section className="py-20 bg-forest-950 text-cream-50 border-t border-gold-500/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Journey"
            title="Our Evolution Roadmap"
            subtitle="A transparent overview of how Evolve Club has developed and the path we are intentionally building."
            theme="dark"
            align="center"
          />

          <div className="mt-16 space-y-8 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:w-0.5 before:bg-forest-800 before:-translate-x-1/2">
            {milestones.map((m, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <AnimatedSection
                  key={idx}
                  delay={idx * 0.1}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-8">
                    <div className="bg-forest-900 p-6 rounded-2xl border border-forest-700/80 hover:border-gold-500/40 transition-all space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-gold-400 uppercase">
                          {m.stage}
                        </span>
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-forest-950 text-cream-200/70 border border-forest-800">
                          {m.highlight}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-cream-50">
                        {m.title}
                      </h4>
                      <p className="text-sm text-cream-200/80 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  </div>

                  {/* Marker Dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-forest-950 border-2 border-gold-400 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gold-400" />
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Be Part of Our Unfolding Story"
        subtitle="Connect with mentors, participate in interactive cohorts, and help cultivate wisdom in youth across our region."
        primaryCtaText="Explore Programmes"
        primaryCtaTo="/programmes"
        secondaryCtaText="Get Involved"
        secondaryCtaTo="/get-involved"
      />
    </div>
  );
};

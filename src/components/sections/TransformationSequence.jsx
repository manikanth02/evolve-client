import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, Sprout, Crown, HeartHandshake, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stages = [
  {
    id: 'discover',
    step: '01',
    name: 'Discover',
    tagline: 'Self-Awareness & Awakening',
    state: 'From Confusion to Clarity',
    description: 'Every great transformation begins within. In this first phase, young minds step away from external noise, examine habitual patterns, and uncover their authentic values and Swadharma.',
    gitaInsight: '“The mind is restless, but can be anchored through practice and awareness.” (Gita 6.35)',
    outcomes: [
      'Understand mental triggers and reactive habits',
      'Identify personal core values and innate strengths',
      'Learn basic mindfulness and intentional pauses'
    ],
    accent: 'from-amber-500/20 to-gold-500/20',
    icon: Search
  },
  {
    id: 'develop',
    step: '02',
    name: 'Develop',
    tagline: 'Disciplined Habits & Mental Hygiene',
    state: 'From Scattered Energy to Focused Action',
    description: 'Wisdom becomes powerful only when translated into daily routine. Here, participants build steady discipline: morning grounding, digital regulation, emotional composure, and clean living.',
    gitaInsight: '“One who is disciplined in eating, resting, work, and recreation conquers all affliction.” (Gita 6.17)',
    outcomes: [
      'Establish a sustainable daily rhythm (Dinacharya)',
      'Overcome digital addiction and attention fragmentation',
      'Cultivate emotional resilience under pressure'
    ],
    accent: 'from-emerald-500/20 to-forest-500/20',
    icon: Compass
  },
  {
    id: 'grow',
    step: '03',
    name: 'Grow',
    tagline: 'Equanimity & Resilience',
    state: 'From Outcome-Obsession to Pure Devotion',
    description: 'Moving beyond praise and blame, participants master Nishkama Karma—giving their highest effort to their craft without succumbing to crippling anxiety over the verdict.',
    gitaInsight: '“You have a right to perform your prescribed duty, but never to the fruits of action.” (Gita 2.47)',
    outcomes: [
      'Eliminate fear of failure and impostor syndrome',
      'Develop Samatvam (equanimity in triumph and setback)',
      'Deepen clarity of purpose and life vision'
    ],
    accent: 'from-teal-500/20 to-cyan-500/20',
    icon: Sprout
  },
  {
    id: 'lead',
    step: '04',
    name: 'Lead',
    tagline: 'Authentic Influence & Responsibility',
    state: 'From Self-Absorption to Exemplary Leadership',
    description: 'Leadership at Evolve Club is not title or domination—it is setting the standard of integrity and taking radical responsibility for peers and teams.',
    gitaInsight: '“Whatever actions great people perform, common people follow. Whatever standards they set, the world honors.” (Gita 3.21)',
    outcomes: [
      'Lead by personal example and steadfast ethics',
      'Communicate with empathy, clarity, and courage',
      'Inspire peers toward constructive goals'
    ],
    accent: 'from-gold-500/30 to-amber-600/20',
    icon: Crown
  },
  {
    id: 'serve',
    step: '05',
    name: 'Serve',
    tagline: 'Selfless Contribution (Seva)',
    state: 'From Individual Ambition to Collective Upliftment',
    description: 'The pinnacle of evolution is a heart dedicated to the welfare of all beings (Sarva-bhuta-hite ratah). True fulfillment is found in humble, continuous contribution to society.',
    gitaInsight: '“The enlightened work for the welfare of the world, free from selfish attachment.” (Gita 3.25)',
    outcomes: [
      'Engage in grassroots community service initiatives',
      'Mentor and uplift younger students',
      'Live with a lasting sense of meaning and contribution'
    ],
    accent: 'from-gold-400/30 to-emerald-400/20',
    icon: HeartHandshake
  }
];

export const TransformationSequence = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = stages[activeStageIndex];

  return (
    <section className="relative py-24 bg-forest-950 overflow-hidden border-y border-gold-500/20">
      {/* Background ambient elements */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3.5 border bg-gold-500/10 border-gold-500/30 text-gold-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Transformation Journey</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-50 tracking-tight leading-tight">
            How Young Minds <span className="gold-text-gradient">Evolve</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-cream-200/80 leading-relaxed">
            Personal transformation is not an accident—it is a progressive evolution from internal awareness to purposeful external service.
          </p>
        </div>

        {/* Interactive Progress Path */}
        <div className="mb-12">
          {/* Progress Bar Line */}
          <div className="hidden md:block relative mb-8">
            <div className="h-1 bg-forest-800 rounded-full w-full absolute top-1/2 -translate-y-1/2" />
            <div
              className="h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-emerald-400 rounded-full transition-all duration-500 absolute top-1/2 -translate-y-1/2"
              style={{ width: `${(activeStageIndex / (stages.length - 1)) * 100}%` }}
            />
          </div>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-5 gap-2 sm:gap-4">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = idx === activeStageIndex;
              const isPast = idx < activeStageIndex;

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`flex flex-col items-center p-2 sm:p-4 rounded-2xl transition-all duration-300 group text-center focus:outline-none ${
                    isActive
                      ? 'bg-forest-900 border-2 border-gold-400 shadow-gold-glow scale-105'
                      : isPast
                      ? 'bg-forest-900/60 border border-gold-500/30 opacity-90 hover:opacity-100'
                      : 'bg-forest-900/30 border border-forest-800/80 opacity-60 hover:opacity-90'
                  }`}
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 transition-transform duration-300 ${
                      isActive
                        ? 'bg-gold-500 text-forest-950 scale-110'
                        : isPast
                        ? 'bg-gold-500/20 text-gold-400'
                        : 'bg-forest-800 text-cream-200/60 group-hover:text-cream-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className={`text-[11px] sm:text-xs font-mono font-semibold tracking-wider ${isActive ? 'text-gold-400' : 'text-cream-200/40'}`}>
                    STEP {stage.step}
                  </span>
                  <span className={`text-xs sm:text-sm font-serif font-bold truncate max-w-full ${isActive ? 'text-cream-50' : 'text-cream-200/70'}`}>
                    {stage.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-forest-900/90 to-forest-950 border border-gold-500/30 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-forest-deep relative overflow-hidden"
          >
            {/* Ambient accent inside card */}
            <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-gradient-to-br ${activeStage.accent}`} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Stage Overview */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-gold-500/20 text-gold-400 border border-gold-500/40">
                    STAGE {activeStage.step} of 05
                  </span>
                  <span className="text-xs uppercase tracking-wider text-cream-200/60 font-medium">
                    {activeStage.state}
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50">
                  {activeStage.name}: <span className="text-gold-300">{activeStage.tagline}</span>
                </h3>

                <p className="text-cream-200/90 text-base sm:text-lg leading-relaxed">
                  {activeStage.description}
                </p>

                {/* Key Outcomes */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                    What You Cultivate In This Stage:
                  </h4>
                  <div className="space-y-2">
                    {activeStage.outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-cream-100">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Wisdom Anchor & CTA */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full bg-forest-950/70 border border-gold-500/20 rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-gold-400/90 block mb-2">
                    Bhagavad Gita Anchor
                  </span>
                  <blockquote className="font-serif text-base sm:text-lg text-cream-50 italic leading-snug border-l-2 border-gold-400 pl-4 py-1">
                    {activeStage.gitaInsight}
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-forest-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-cream-200/60">
                    Ready to take this step?
                  </span>
                  <Link
                    to="/programmes"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors group"
                  >
                    <span>Explore Programmes</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  ArrowRight,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Users,
  HeartHandshake,
  TrendingUp,
  Building2,
  Calendar,
  CheckCircle2,
  Quote
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { TransformationSequence } from '../components/sections/TransformationSequence';
import { ProgrammeCard } from '../components/common/ProgrammeCard';
import { ArticleCard } from '../components/common/ArticleCard';
import { ImpactCard } from '../components/common/ImpactCard';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingIndicator } from '../components/common/LoadingIndicator';
import { CTASection } from '../components/sections/CTASection';
import { SpeakerSection } from '../components/speakers/SpeakerSection';
import { api } from '../services/api';

export const HomePage = () => {
  const [programmes, setProgrammes] = useState([]);
  const [articles, setArticles] = useState([]);
  const [activities, setActivities] = useState([]);
  const [impactData, setImpactData] = useState({ metrics: [], hasVerifiedData: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Evolve Club — Youth Empowerment, Purposeful Living & Lasting Transformation';
    const fetchData = async () => {
      try {
        setLoading(true);
        const [progRes, artRes, actRes, impRes] = await Promise.all([
          api.getProgrammes({ limit: 4 }),
          api.getArticles({ limit: 3 }),
          api.getActivities(),
          api.getImpact()
        ]);

        if (progRes.data?.programmes) setProgrammes(progRes.data.programmes.slice(0, 4));
        if (artRes.data?.articles) setArticles(artRes.data.articles.slice(0, 3));
        if (actRes.data?.activities) setActivities(actRes.data.activities.slice(0, 3));
        if (impRes.data) setImpactData(impRes.data);
      } catch (err) {
        console.error('Home page fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-cream-50 text-forest-950">
      {/* 1. Hero Section */}
      <section className="relative min-h-[82vh] sm:min-h-[92vh] flex items-center justify-center bg-forest-950 text-cream-50 overflow-hidden pt-20 pb-10 sm:pt-28 sm:pb-16">
        {/* Ambient atmospheric layers */}
        <div className="absolute inset-0 bg-forest-gradient opacity-95" />
        <div className="absolute inset-0 bg-grain opacity-30" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gold-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-forest-600/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5 sm:space-y-8">
          {/* Subtle Tagline Pill - Concise on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-sm font-medium bg-forest-900/80 border border-gold-500/40 text-gold-300 shadow-gold-glow backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-400 shrink-0" />
            <span className="hidden sm:inline">Youth Empowerment · Purposeful Living · Lasting Transformation</span>
            <span className="sm:hidden">Youth Empowerment & Purpose</span>
          </motion.div>

          {/* Master Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-cream-50 leading-[1.18] sm:leading-[1.15] max-w-5xl mx-auto"
          >
            Every Great Transformation <br className="hidden sm:inline" />
            <span className="gold-text-gradient">Begins Within.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-xl md:text-2xl text-cream-200/90 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Helping young people grow with wisdom, purpose, and positive action.
          </motion.p>

          {/* Bhagavad Gita Shloka */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl bg-forest-900/60 border border-gold-500/30 backdrop-blur-sm shadow-forest-deep relative"
          >
            <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400/50 mx-auto mb-1.5 sm:mb-2" />
            <blockquote className="font-serif italic text-sm sm:text-lg text-cream-100/95 leading-relaxed tracking-wide">
              “For one who has conquered the mind, it is the best of friends; but for one who has failed to do so, it will remain the greatest enemy.”
            </blockquote>
            <cite className="block mt-2 text-[11px] sm:text-sm font-mono tracking-wider text-gold-400 not-italic font-semibold">
              — Bhagavad Gita 6.6
            </cite>
          </motion.div>

          {/* Primary Action Buttons - Exactly Two Prominent Actions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 max-w-md sm:max-w-none mx-auto"
          >
            <Button
              to="/our-journey"
              variant="gold"
              size="lg"
              icon={ArrowRight}
              className="w-full sm:w-auto justify-center text-center min-h-[46px]"
            >
              Explore Our Journey
            </Button>

            <Button
              to="/programmes"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto justify-center text-center min-h-[46px]"
            >
              Discover Our Programmes
            </Button>
          </motion.div>

          {/* Motto Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="pt-4 sm:pt-12 flex items-center justify-center gap-3 sm:gap-8 text-[11px] sm:text-sm uppercase tracking-widest text-gold-400/80 font-mono"
          >
            <span>LEARN</span>
            <span className="text-forest-700">·</span>
            <span>GROW</span>
            <span className="text-forest-700">·</span>
            <span>SERVE</span>
            <span className="text-forest-700">·</span>
            <span>LEAD</span>
          </motion.div>
        </div>
      </section>

      {/* 2. Interactive Transformation Sequence */}
      <TransformationSequence />

      {/* 3. Introduction to Evolve Club & Four Pillars */}
      <section className="py-12 sm:py-24 bg-cream-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="About Evolve Club"
            title="A Modern Movement for"
            highlightWord="Inner Strength & Character"
            subtitle="In an era marked by attention fragmentation, comparison, and rapid change, Evolve Club stands as a dedicated sanctuary for youth to build lifelong psychological and moral anchors."
            theme="light"
            align="center"
          />

          <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              {
                title: 'Strong Character & Habits',
                desc: 'Replacing involuntary compulsions with mindful discipline, intentional morning routines, and lasting integrity.',
                icon: ShieldCheck
              },
              {
                title: 'Leadership & Life Skills',
                desc: 'Developing clarity under pressure, thoughtful decision-making, and empathetic communication.',
                icon: Compass
              },
              {
                title: 'Bhagavad Gita Wisdom',
                desc: 'Distilling timeless psychological frameworks into direct action steps for modern academic, personal, and career hurdles.',
                icon: BookOpen
              },
              {
                title: 'Selfless Service (Seva)',
                desc: 'Translating empathy into grassroots community projects that uplift society and awaken collective consciousness.',
                icon: HeartHandshake
              }
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <AnimatedSection
                  key={i}
                  delay={i * 0.1}
                  className="bg-white p-5 sm:p-8 rounded-2xl border border-gold-500/20 shadow-sm hover:shadow-md transition-all duration-300 hover:border-gold-500/50 flex flex-col justify-between"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-forest-950">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-forest-800/80 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-cream-200">
                    <span className="text-xs font-mono font-semibold uppercase text-gold-600">
                      Pillar 0{i + 1}
                    </span>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Bhagavad Gita Wisdom Spotlight */}
      <section className="py-12 sm:py-24 bg-cream-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Timeless Wisdom for Modern Life"
            title="The Psychology of"
            highlightWord="The Bhagavad Gita"
            subtitle="Not a dogma or distant history, but a profound roadmap for mental resilience, decisive action, and inner equilibrium."
            theme="light"
            align="center"
          />

          {/* Featured Verse Spotlight Banner */}
          <AnimatedSection className="mt-10 sm:mt-14 max-w-4xl mx-auto bg-gradient-to-br from-forest-900 to-forest-950 text-cream-50 rounded-2xl sm:rounded-3xl p-5 sm:p-12 border border-gold-500/40 shadow-forest-deep relative">
            <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-gold-500/20 absolute top-4 sm:top-6 right-4 sm:right-6 pointer-events-none" />
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-gold-500/20 text-gold-400 border border-gold-500/30">
                BHAGAVAD GITA 2.47
              </div>

              <div className="space-y-2">
                <p className="font-serif text-base sm:text-xl text-gold-300 italic leading-relaxed">
                  कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।<br />
                  मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥
                </p>
                <p className="text-xs sm:text-base text-cream-200/90 leading-relaxed font-light">
                  "You have a rightful claim only to your duty, never to its fruits. Let not the outcome of work be your reward, nor let you be attached to inaction."
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-forest-900/80 border border-forest-700/80 space-y-1">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-gold-400 font-semibold block">
                  Actionable Modern Application:
                </span>
                <p className="text-xs sm:text-sm text-cream-100 leading-relaxed">
                  Liberate yourself from outcome anxiety. Pour complete dedication into your present preparation and duty, without tying your self-worth to results outside your direct control.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Wisdom Articles Preview */}
          <div className="mt-12 sm:mt-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-2">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-950">
                Recent Insights & Reflections
              </h3>
              <Link
                to="/programmes#wisdom-reflections"
                className="text-xs sm:text-sm font-semibold text-gold-600 hover:text-gold-700 flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Explore Wisdom Reflections</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Reusable Facilitators & Mentors Section */}
      <SpeakerSection />

      {/* 8. Corporate Collaboration Preview */}
      <section className="py-12 sm:py-20 bg-forest-950 text-cream-50 relative border-t border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-forest-900 via-forest-900 to-forest-950 border border-gold-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 shadow-forest-deep">
            <div className="space-y-3 sm:space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase bg-gold-500/10 text-gold-400 border border-gold-500/30">
                <Building2 className="w-3.5 h-3.5" />
                <span>For Organisations & Teams</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-cream-50 leading-tight">
                Workshops for Modern Workplaces & Emerging Teams
              </h3>
              <p className="text-xs sm:text-base text-cream-200/80 leading-relaxed font-light">
                Tailored sessions on stress mastery, purpose-driven leadership, cognitive clarity, and ethical decision-making for organisations in Chandigarh, Mohali, and beyond.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
              <Button
                to="/for-organisations"
                variant="gold"
                size="md"
                icon={ArrowRight}
                className="w-full sm:w-auto justify-center text-center min-h-[44px]"
              >
                Organisation Workshops
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <CTASection />
    </div>
  );
};

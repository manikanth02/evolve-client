import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Heart,
  Quote,
  Target,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { Button } from '../components/common/Button';
import { CTASection } from '../components/sections/CTASection';
import { ArticleContentRenderer } from '../components/common/ArticleContentRenderer';
import { mockArticles } from '../services/mockData';
import { api } from '../services/api';

// 8 Core Focus Areas
const focusAreas = [
  {
    id: 'leadership',
    title: 'Leadership & Character Development',
    category: 'Leadership Development',
    desc: 'Cultivating selfless leadership (Nishkama Karma), emotional composure, and the courage to take ethical responsibility for teams.',
    format: 'Cohort & Workshops',
    icon: ShieldCheck,
    slug: 'leadership-development-inner-mastery'
  },
  {
    id: 'mind-management',
    title: 'Life Skills & Mind Management',
    category: 'Life Skills',
    desc: 'Practical tools to overcome digital distraction, manage anxiety, and establish steady daily routines of cognitive focus.',
    format: 'Intensive Workshop',
    icon: Compass,
    slug: 'life-skills-mind-management'
  },
  {
    id: 'purposeful-living',
    title: 'Purposeful Living & Personal Growth',
    category: 'Purposeful Living',
    desc: 'Exploring Swadharma (one’s true duty and calling) to align innate personal aptitudes with meaningful societal contribution.',
    format: 'Reflection Circle',
    icon: Target,
    slug: 'purposeful-living-personal-philosophy'
  },
  {
    id: 'gita-wisdom',
    title: 'Practical Bhagavad Gita Wisdom',
    category: 'Practical Bhagavad Gita Wisdom',
    desc: 'Translating timeless psychological dialogues into direct frameworks for overcoming inner dilemmas and outcome anxiety.',
    format: 'Weekly Dialogue',
    icon: BookOpen,
    slug: 'practical-bhagavad-gita-wisdom'
  },
  {
    id: 'wellbeing',
    title: 'Healthy Habits & Well-being',
    category: 'Healthy Habits and Well-being',
    desc: 'Harmonizing sleep, nutrition, mental vitality, and recreation through sustainable daily lifestyle rhythms (Dinacharya).',
    format: 'Lifestyle Cohort',
    icon: Sparkles,
    slug: 'healthy-habits-energy-wellbeing'
  },
  {
    id: 'mentorship',
    title: 'Youth Mentorship & Peer Growth',
    category: 'Youth Mentorship',
    desc: 'Connecting aspiring youth with compassionate mentors and like-minded peers for mutual upliftment, guidance, and accountability.',
    format: '1-on-1 & Circles',
    icon: ShieldCheck,
    slug: 'youth-mentorship-peer-growth'
  },
  {
    id: 'community-service',
    title: 'Community Service (Seva)',
    category: 'Community Service',
    desc: 'Translating wisdom into tangible social action through grassroots civic initiatives, environmental care, and service to society.',
    format: 'Weekend Field Drives',
    icon: Heart,
    slug: 'community-service-social-impact'
  },
  {
    id: 'addiction-awareness',
    title: 'Addiction Awareness & Responsible Choices',
    category: 'Addiction Awareness and Responsible Choices',
    desc: 'Reclaiming agency from compulsive habits, screen overload, and peer conformity in a supportive, judgment-free environment.',
    format: 'Support Circles',
    icon: Compass,
    slug: 'addiction-awareness-responsible-choices'
  }
];

export const ProgrammesPage = () => {
  const [articlesList, setArticlesList] = useState(mockArticles);

  useEffect(() => {
    document.title = 'Our Programmes — Purposeful Growth & Practical Wisdom | Evolve Club';

    const loadArticles = async () => {
      try {
        const res = await api.getArticles();
        if (res.data?.articles && res.data.articles.length > 0) {
          setArticlesList(res.data.articles);
        }
      } catch (err) {
        console.warn('ProgrammesPage: fallback to static articles', err);
      }
    };

    loadArticles();
  }, []);

  return (
    <div className="min-h-screen bg-cream-50 text-forest-950 pt-24 pb-12">
      {/* SECTION A: Introduction Banner */}
      <section className="bg-forest-950 text-cream-50 py-20 relative overflow-hidden border-b border-gold-500/20">
        <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400">
            <Compass className="w-3.5 h-3.5" />
            <span>Character · Mind Mastery · Timeless Wisdom</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50 leading-tight">
            Programmes for <span className="gold-text-gradient">Purposeful Growth</span>
          </h1>

          <p className="text-lg sm:text-xl text-cream-200/90 max-w-3xl mx-auto font-light leading-relaxed">
            Evolve Club offers structured developmental opportunities helping young minds build cognitive clarity, emotional composure, and service-oriented leadership.
          </p>
        </div>
      </section>

      {/* Curriculum Disclosure Note */}
      <div className="bg-gold-500/10 border-b border-gold-500/20 py-3 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm text-forest-900 font-medium text-center">
          <AlertCircle className="w-4 h-4 text-gold-600 shrink-0" />
          <span>
            These focus areas guide our active cohorts and campus workshops. Enrolment is opened on a scheduled cohort basis without commercial course fees.
          </span>
        </div>
      </div>

      {/* SECTION B: Our Focus Areas Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Curriculum Framework"
          title="Our Core"
          highlightWord="Development Focus Areas"
          subtitle="Explore the pillars through which we guide students and emerging professionals toward personal mastery."
          theme="light"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <AnimatedSection
                key={area.id}
                delay={idx * 0.05}
                className="bg-white p-7 rounded-3xl border border-gold-500/20 shadow-sm hover:border-gold-500/50 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-forest-900 text-gold-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-gold-600 bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-500/20">
                      {area.format}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-forest-950 group-hover:text-gold-600 transition-colors leading-snug">
                    {area.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-forest-800/80 leading-relaxed">
                    {area.desc}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-cream-200 flex items-center justify-between gap-2">
                  <Link
                    to={`/programmes/${area.slug}`}
                    className="text-xs font-semibold text-forest-800 hover:text-gold-600 transition-colors"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/get-involved?interest=Programme&programme=${encodeURIComponent(area.title)}`}
                    className="text-xs font-semibold text-gold-600 hover:text-gold-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Register Interest</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* SECTION C: Integrated Wisdom Hub Content */}
      <section id="wisdom-reflections" className="py-20 bg-cream-100 border-t border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Timeless Wisdom for Modern Life"
            title="Practical Reflections from"
            highlightWord="The Bhagavad Gita"
            subtitle="The Gita is not a distant history or passive scripture, but a psychological manual for navigating duty, focus, and outcome anxiety."
            theme="light"
            align="center"
          />

          {/* Responsive 3-Card Grid for Reflections */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articlesList.map((art, idx) => {
              const cleanExcerpt = art.excerpt ? art.excerpt.replace(/[*#_`~>]/g, '').trim() : '';
              return (
                <AnimatedSection
                  key={art.slug}
                  delay={idx * 0.1}
                  className="flex flex-col flex-1"
                >
                  <Link
                    to={`/wisdom-hub/${art.slug}`}
                    className="group flex flex-col bg-white hover:bg-cream-50/70 border border-gold-500/25 hover:border-gold-500/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex-1 justify-between cursor-pointer"
                  >
                    {/* Card Visual Header with Ambient Backdrop and Uncropped Artwork */}
                    <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-forest-950 flex items-center justify-center">
                      {art.image ? (
                        <>
                          <div
                            className="absolute inset-0 bg-cover bg-center blur-xl opacity-40 scale-110 pointer-events-none"
                            style={{ backgroundImage: `url("${art.image}")` }}
                          />
                          <img
                            src={art.image}
                            alt={art.title}
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
                      <div className="absolute top-3.5 left-3.5 z-20">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-forest-950/90 text-gold-400 border border-gold-500/30 backdrop-blur-sm">
                          {art.category}
                        </span>
                      </div>
                      {art.readTime && (
                        <div className="absolute bottom-3 right-3 z-20">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-forest-950/90 text-gold-300 backdrop-blur-sm border border-gold-500/20">
                            {art.readTime}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                      <div className="space-y-3">
                        {art.verseReference && (
                          <div className="flex items-center gap-1.5 text-xs font-mono text-gold-700 font-bold tracking-wide">
                            <Sparkles className="w-3.5 h-3.5 shrink-0 text-gold-600" />
                            <span>{art.verseReference}</span>
                          </div>
                        )}

                        <h3 className="font-serif text-xl font-bold text-forest-950 group-hover:text-gold-700 transition-colors leading-snug line-clamp-2">
                          {art.title}
                        </h3>

                        <p className="text-sm text-forest-800/80 line-clamp-3 leading-relaxed">
                          {cleanExcerpt}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
                        {art.author ? (
                          <span className="text-xs text-forest-700/80 font-medium">
                            By {art.author}
                          </span>
                        ) : (
                          <span className="text-xs text-forest-700/60 font-mono">
                            Bhagavad Gita
                          </span>
                        )}

                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 group-hover:text-gold-700 transition-colors ml-auto">
                          <span>Read Reflection</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/wisdom-hub"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-forest-900 text-cream-50 hover:bg-forest-950 border border-gold-500/30 text-sm font-semibold transition-all hover:scale-105 shadow-md"
            >
              <BookOpen className="w-4 h-4 text-gold-400" />
              <span>Explore All Wisdom Hub Reflections</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION D: Registration or Enquiry Call-To-Action */}
      <CTASection
        badge="Enquire & Participate"
        title="Ready to Deepen Your Growth?"
        subtitle="Submit an expression of interest to join an upcoming cohort, wisdom circle, or youth workshop. Our team will guide you to the right pathway."
        primaryCtaText="Register Interest"
        primaryCtaTo="/get-involved"
        secondaryCtaText="Learn About Our Journey"
        secondaryCtaTo="/our-journey"
      />
    </div>
  );
};

export default ProgrammesPage;

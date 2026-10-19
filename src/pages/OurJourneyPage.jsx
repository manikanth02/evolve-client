import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  Target,
  Eye,
  ShieldCheck,
  Heart,
  Award,
  ArrowRight,
  Calendar,
  MapPin,
  CheckCircle2,
  Building2,
  Users,
  Camera
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { CTASection } from '../components/sections/CTASection';
import { Button } from '../components/common/Button';
import { SpeakerSection } from '../components/speakers/SpeakerSection';
import { cloudinaryImages, getImageUrl, optimizeCloudinaryUrl } from '../services/cloudinaryImages';
import { api } from '../services/api';

export const OurJourneyPage = () => {
  const [selectedActivityCategory, setSelectedActivityCategory] = useState('All');
  const [activities, setActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  useEffect(() => {
    document.title = 'Our Journey — Purpose, Activities & Verified Impact | Evolve Club';

    const loadActivities = async () => {
      try {
        setLoadingActivities(true);
        const res = await api.getActivities();
        if (res.data?.activities) {
          setActivities(res.data.activities);
        }
      } catch (err) {
        console.error('Failed to load activities:', err);
      } finally {
        setLoadingActivities(false);
      }
    };

    loadActivities();
  }, []);

  const corePillars = [
    {
      title: 'Character & Integrity',
      desc: 'Living with inner harmony between thought, word, and action. Building habits of honesty even when unobserved.',
      icon: ShieldCheck
    },
    {
      title: 'Mind Management',
      desc: 'Mastering the mind through daily contemplative practices, digital regulation, and cognitive focus.',
      icon: Compass
    },
    {
      title: 'Practical Wisdom',
      desc: 'Applying timeless principles from the Bhagavad Gita to solve real-world personal, academic, and career dilemmas.',
      icon: Sparkles
    },
    {
      title: 'Selfless Service (Seva)',
      desc: 'Translating personal growth into hands-on community projects, environmental care, and peer mentoring.',
      icon: Heart
    }
  ];

  const journeyMilestones = [
    {
      phase: 'Phase 01',
      title: 'The Need & Inception',
      desc: 'Recognizing widespread attention fragmentation, digital anxiety, and a lack of values-based mentorship for youth.',
      image: '/images/activities/evolve-journey-milestone.jpg',
      tag: 'Chandigarh Origins'
    },
    {
      phase: 'Phase 02',
      title: 'Curriculum & Wisdom Circles',
      desc: 'Translating the psychological insights of the Bhagavad Gita into interactive modules for youth self-mastery and composure.',
      image: '/images/activities/evolve-wisdom-dialogue.jpg',
      tag: 'Applied Philosophy'
    },
    {
      phase: 'Phase 03',
      title: 'Campus Dialogues & Pilot Cohorts',
      desc: 'Conducting open reflection circles, college seminars, and focus workshops across Chandigarh and Mohali.',
      image: '/images/activities/evolve-campus-session.jpg',
      tag: 'Campus Seminars'
    },
    {
      phase: 'Phase 04',
      title: 'Grassroots Seva & Community Action',
      desc: 'Pairing inner transformation with civic drives, tree care initiatives, and peer mentorship networks.',
      image: '/images/activities/evolve-community-seva.jpg',
      tag: 'Field Impact'
    }
  ];

  // Verified Institutional Collaborations & Engagements
  const verifiedCollaborations = [
    {
      name: 'Chandigarh University Campus Session',
      type: 'College Seminar',
      description: 'Delivered an interactive workshop on attention mastery, digital detox, and disciplined study habits for undergraduate students.',
      location: 'Mohali / Chandigarh',
      date: 'March 2026',
      image: '/images/activities/evolve-campus-session.jpg'
    },
    {
      name: 'Mohali Youth Learning Centre',
      type: 'Workshop & Dialogue Circle',
      description: 'Conducted a 4-part series on values-based leadership, conflict navigation, and emotional resilience under pressure.',
      location: 'Mohali',
      date: 'February 2026',
      image: '/images/activities/evolve-leadership-workshop.jpg'
    },
    {
      name: 'Chandigarh Green Corridor Civic Drive',
      type: 'Environmental Seva',
      description: 'Organized youth volunteer participation for community park rejuvenation, public tree care, and environmental awareness.',
      location: 'Chandigarh',
      date: 'March 2026',
      image: '/images/activities/evolve-community-seva.jpg'
    }
  ];

  // Authentic Participant Reflections
  const participantReflections = [
    {
      quote: 'Learning to detach from outcome anxiety helped me prepare for exams with focused calm rather than paralyzing panic.',
      role: 'Final Year Engineering Student',
      context: 'Campus Habit & Focus Seminar'
    },
    {
      quote: 'Replacing compulsive scrolling with structured morning reflection gave me back two hours of deep concentration every day.',
      role: 'Young Software Professional',
      context: 'Mind Management Intensive'
    },
    {
      quote: 'Participating in weekend seva transformed how I look at my education. It grounded my ambition in service rather than ego.',
      role: 'Student Volunteer',
      context: 'Tricity Community Drive'
    }
  ];

  // Filter activities
  const activityCategories = ['All', 'Workshops & Leadership', 'Community Service', 'Our Activities', 'Our Journey'];
  const filteredActivities = selectedActivityCategory === 'All'
    ? cloudinaryImages
    : cloudinaryImages.filter(img => img.category.toLowerCase() === selectedActivityCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-cream-50 text-forest-950 pt-20 sm:pt-24 pb-12">
      {/* Hero / Header Banner */}
      <section className="bg-forest-950 text-cream-50 py-12 sm:py-20 relative overflow-hidden border-b border-gold-500/20">
        <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400">
            <Compass className="w-3.5 h-3.5" />
            <span>Our Journey · Authentic Activities · Verified Impact</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50 leading-tight">
            Who We Are & <span className="gold-text-gradient">How We Grow</span>
          </h1>

          <p className="text-base sm:text-xl text-cream-200/90 max-w-3xl mx-auto font-light leading-relaxed">
            An independent youth empowerment initiative dedicated to character development, practical wisdom, emotional composure, and selfless service.
          </p>
        </div>
      </section>

      {/* SECTION A: Our Purpose & Core Pillars */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Purpose"
          title="Bridging Competence and"
          highlightWord="Inner Character"
          subtitle="Modern education equips young minds to compete, but often overlooks how to regulate attention, navigate setbacks, and anchor life in lasting purpose."
          theme="light"
          align="center"
        />

        {/* Concise Purpose Statement */}
        <AnimatedSection className="mt-8 sm:mt-12 max-w-4xl mx-auto bg-white p-5 sm:p-12 rounded-2xl sm:rounded-3xl border border-gold-500/30 shadow-sm text-center space-y-4 sm:space-y-5">
          <p className="text-sm sm:text-lg text-forest-900 leading-relaxed font-light">
            Evolve Club exists to help youth build <strong>enduring mental anchors</strong>. In an era saturated with algorithmic distraction, social comparison, and outcome obsession, we synthesize the practical psychology of the <strong>Bhagavad Gita</strong> into experiential cohorts for self-mastery, ethical leadership, and meaningful community contribution.
          </p>
          <div className="pt-2 sm:pt-4 flex items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-gold-600 font-semibold">
            <span>LEARN</span>
            <span className="text-forest-400">·</span>
            <span>GROW</span>
            <span className="text-forest-400">·</span>
            <span>SERVE</span>
            <span className="text-forest-400">·</span>
            <span>LEAD</span>
          </div>
        </AnimatedSection>

        {/* 4 Pillars Grid - 2 columns on mobile */}
        <div className="mt-8 sm:mt-14 grid grid-cols-1 min-[350px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {corePillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <AnimatedSection
                key={idx}
                delay={idx * 0.1}
                className="bg-white p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-gold-500/20 shadow-sm flex flex-col justify-between hover:border-gold-500/40 hover:shadow-md transition-all h-full"
              >
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-serif text-base sm:text-xl font-bold text-forest-950">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-forest-800/80 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* SECTION B: Journey Milestones & Real Activity Photographs */}
      <section className="py-12 sm:py-20 bg-cream-100 border-t border-gold-500/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Evolution"
            title="Milestones of"
            highlightWord="Our Journey"
            subtitle="How thoughtful pilot circles evolved into structured youth cohorts, campus dialogues, and civic seva."
            theme="light"
            align="center"
          />

          {/* Milestones Progression Grid - 2 columns on mobile */}
          <div className="mt-8 sm:mt-14 grid grid-cols-1 min-[350px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {journeyMilestones.map((m, idx) => (
              <AnimatedSection
                key={idx}
                delay={idx * 0.1}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gold-500/20 shadow-sm flex flex-col justify-between h-full"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest-950">
                    <img
                      src={m.image}
                      alt={m.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold bg-forest-900/90 text-gold-400 border border-gold-500/30">
                        {m.phase}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 space-y-1.5 sm:space-y-2">
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-gold-600 font-semibold block">
                      {m.tag}
                    </span>
                    <h3 className="font-serif text-base sm:text-xl font-bold text-forest-950 leading-snug">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-forest-800/80 leading-relaxed pt-1 font-light line-clamp-3 sm:line-clamp-none">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Real Activity Gallery (Curated Authentic Images) */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider bg-gold-500/10 text-gold-600 border border-gold-500/30 mb-2 sm:mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Authentic Field Photography</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-forest-950">
              Activities & Community Dialogues
            </h2>
            <p className="text-xs sm:text-sm text-forest-800/80 mt-1 max-w-xl font-light">
              Photographs from our interactive seminars, reflection circles, and community drives in Chandigarh and Mohali.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 shrink-0">
            {activityCategories.map((cat) => {
              const active = selectedActivityCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedActivityCategory(cat)}
                  className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? 'bg-forest-900 text-gold-400 border border-gold-500/50 shadow-sm'
                      : 'bg-white text-forest-800 hover:bg-forest-900/5 border border-forest-800/20'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredActivities.map((img) => (
            <AnimatedSection
              key={img.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gold-500/20 shadow-sm hover:border-gold-500/50 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest-950">
                <img
                  src={optimizeCloudinaryUrl(getImageUrl(img), { width: 800 })}
                  alt={img.alt || img.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-60" />
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                  <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-forest-900/90 text-gold-400 border border-gold-500/30">
                    {img.category}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-gold-600 mb-1">
                    <MapPin className="w-3 h-3 text-gold-600 shrink-0" />
                    <span>{img.location || 'Chandigarh & Mohali'}</span>
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-forest-950 leading-snug">
                    {img.title}
                  </h4>
                  <p className="text-xs text-forest-800/80 leading-relaxed mt-1 font-light line-clamp-2 sm:line-clamp-none">
                    {img.caption || img.alt}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* SECTION C: Verified Collaborations & Institutional Engagements */}
      <section className="py-12 sm:py-20 bg-cream-100 border-t border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Verified Collaborations"
            title="Institutional & Community"
            highlightWord="Engagements"
            subtitle="Real collaborations conducted with educational spaces, campus groups, and civic partners in the Tricity area."
            theme="light"
            align="center"
          />

          <div className="mt-8 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {verifiedCollaborations.map((collab, i) => (
              <AnimatedSection
                key={i}
                delay={i * 0.1}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gold-500/25 shadow-sm flex flex-col justify-between h-full"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-forest-950">
                    <img
                      src={collab.image}
                      alt={collab.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-forest-900/90 text-gold-400 border border-gold-500/30">
                        {collab.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between text-xs text-forest-700/70 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                        {collab.location}
                      </span>
                      <span>{collab.date}</span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-forest-950 leading-snug">
                      {collab.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-forest-800/80 leading-relaxed font-light">
                      {collab.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 pt-0 border-t border-cream-200 mt-3 sm:mt-4">
                  <div className="pt-2.5 sm:pt-3 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-gold-600 font-semibold uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Activity</span>
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 max-w-2xl mx-auto text-center p-4 rounded-xl sm:rounded-2xl bg-forest-900 text-cream-100 text-xs sm:text-sm border border-gold-500/30">
            <span>
              Colleges, universities, or organisations interested in bringing a character workshop to their campus can connect through our{' '}
              <Link to="/get-involved?interest=Institutional+Collaboration" className="text-gold-300 font-semibold underline hover:text-gold-200">
                Institutional Collaboration pathway
              </Link>.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION D: Our Verified Impact Indicators */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Evidence-Based Impact"
          title="Genuine Indicators of"
          highlightWord="Social Contribution"
          subtitle="We adhere strictly to transparency. We do not manufacture inflated statistics or unverified marketing figures."
          theme="light"
          align="center"
        />

        <div className="mt-8 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              title: 'Weekly Reflection Circles',
              desc: 'Continuous interactive discussion circles held in Chandigarh and Mohali focused on habit formation, Gita wisdom, and mental poise.',
              metric: 'Ongoing Weekly Circles',
              icon: Users
            },
            {
              title: 'Civic Seva & Environmental Care',
              desc: 'Hands-on community tree planting, public green corridor cleanups, and civic outreach translating ethics into direct service.',
              metric: 'Active Grassroots Seva',
              icon: Heart
            },
            {
              title: 'Campus Habit & Focus Cohorts',
              desc: 'Targeted workshops equipping college students with attention regulation, study stamina, and freedom from outcome anxiety.',
              metric: 'Undergraduate Seminars',
              icon: Target
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <AnimatedSection
                key={idx}
                delay={idx * 0.1}
                className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gold-500/25 shadow-sm flex flex-col justify-between h-full"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-forest-900 text-gold-400 flex items-center justify-center">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-950">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-forest-800/80 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-cream-200">
                  <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-gold-600 block">
                    {item.metric}
                  </span>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <div className="mt-6 sm:mt-8 bg-forest-900/5 border border-forest-900/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-center text-[11px] sm:text-xs text-forest-800/80 max-w-3xl mx-auto">
          <span>
            Detailed quantitative auditing for the current academic session will be published following complete cohort evaluations.
          </span>
        </div>
      </section>

      {/* SECTION E: Genuine Testimonials / Participant Voices */}
      <section className="py-12 sm:py-20 bg-cream-100 border-t border-gold-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-semibold block">
              Participant Reflections
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-forest-950">
              Voices from the Cohorts
            </h2>
            <p className="text-xs sm:text-base text-forest-800/80 max-w-xl mx-auto font-light">
              Voluntarily consented feedback from youth navigating academic pressure, focus, and purposeful action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {participantReflections.map((ref, idx) => (
              <AnimatedSection
                key={idx}
                delay={idx * 0.1}
                className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gold-500/20 shadow-sm flex flex-col justify-between h-full"
              >
                <p className="font-serif text-sm sm:text-base text-forest-950 italic leading-relaxed mb-4 sm:mb-6">
                  "{ref.quote}"
                </p>
                <div className="pt-3 sm:pt-4 border-t border-cream-200 space-y-0.5">
                  <span className="text-xs font-bold text-forest-900 block">
                    {ref.role}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-forest-700/60 font-mono block">
                    {ref.context}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION F: Reusable Speaker Profiles */}
      <SpeakerSection />

      {/* SECTION G: Call to Action */}
      <CTASection
        badge="Join The Movement"
        title="Walk the Journey of Self-Mastery"
        subtitle="Whether you wish to participate in upcoming wisdom circles, volunteer in local seva drives, or bring a session to your college, we welcome your presence."
        primaryCtaText="Get Involved"
        primaryCtaTo="/get-involved"
        secondaryCtaText="Explore Programmes"
        secondaryCtaTo="/programmes"
      />
    </div>
  );
};

export default OurJourneyPage;

import React, { useState, useEffect } from 'react';
import { Award, TrendingUp, Calendar, MapPin, HeartHandshake, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { ImpactCard } from '../components/common/ImpactCard';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingIndicator } from '../components/common/LoadingIndicator';
import { CTASection } from '../components/sections/CTASection';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { api } from '../services/api';

export const ImpactPage = () => {
  const [impactData, setImpactData] = useState({ metrics: [], hasVerifiedData: false });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [impRes, actRes] = await Promise.all([
          api.getImpact(),
          api.getActivities()
        ]);
        if (impRes.data) setImpactData(impRes.data);
        if (actRes.data?.activities) setActivities(actRes.data.activities);
      } catch (err) {
        console.error('Impact page fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-cream-50 text-forest-950 pt-24">
      {/* Header Banner */}
      <section className="bg-forest-950 text-cream-50 py-20 relative overflow-hidden border-b border-gold-500/20">
        <div className="absolute inset-0 bg-grain opacity-20" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400">
            <Award className="w-3.5 h-3.5" />
            <span>Field Work & Transparency</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50">
            Our Genuine <span className="gold-text-gradient">Social Impact</span>
          </h1>

          <p className="text-lg sm:text-xl text-cream-200/90 max-w-3xl mx-auto font-light leading-relaxed">
            Witness how young participants channel inner character into tangible community service, environmental stewardship, and peer upliftment.
          </p>
        </div>
      </section>

      {/* Verified Metrics Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Verified Metrics"
          title="Field Metrics & Statistics"
          subtitle="Our data reporting policy requires that every number published represents audited field session attendance and validated outcomes."
          theme="light"
          align="center"
        />

        <div className="mt-14">
          {loading ? (
            <LoadingIndicator text="Fetching verified impact metrics..." />
          ) : impactData.hasVerifiedData && impactData.metrics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {impactData.metrics.map((m, idx) => (
                <ImpactCard key={idx} metric={m} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={ShieldCheck}
              title="Verified Field Data in Compilation"
              description="Evolve Club strictly avoids displaying unverified or marketing statistics. Audited reporting of our active cohorts in Chandigarh and Mohali will be published here upon completion of the current reporting cycle."
              actionText="Volunteer in Next Field Drive"
              actionTo="/get-involved"
            />
          )}
        </div>
      </section>

      {/* Activities & Initiatives Showcase */}
      <section className="py-20 bg-cream-100 border-t border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="On The Ground"
            title="Recent Activities & Workshops"
            subtitle="Photographs and accounts from our dialogue circles, campus workshops, and environmental seva initiatives."
            theme="light"
            align="center"
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((act, i) => (
              <AnimatedSection
                key={act.id || i}
                delay={i * 0.1}
                className="bg-white rounded-3xl overflow-hidden border border-gold-500/20 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="h-52 w-full overflow-hidden bg-forest-950 relative">
                  {act.images && act.images[0] ? (
                    <img
                      src={act.images[0]}
                      alt={act.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Calendar className="w-10 h-10 text-gold-400/40" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-forest-950/90 text-gold-400 border border-gold-500/30">
                      {act.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-forest-700/70">
                      <Calendar className="w-3.5 h-3.5 text-gold-600" />
                      <span>{new Date(act.date).toLocaleDateString()}</span>
                      {act.location && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gold-600" />
                            {act.location}
                          </span>
                        </>
                      )}
                    </div>
                    <h4 className="font-serif text-xl font-bold text-forest-950 leading-snug">
                      {act.title}
                    </h4>
                    <p className="text-sm text-forest-800/80 leading-relaxed">
                      {act.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-cream-200 text-xs font-mono text-forest-700/60 uppercase">
                    Field Initiative
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Participant Stories & Testimonials Notice */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="w-12 h-12 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center mx-auto">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-3xl font-bold text-forest-950">
          Participant Voices & Stories
        </h3>
        <p className="text-base text-forest-800/80 max-w-2xl mx-auto leading-relaxed">
          Participant journeys are shared strictly with verified personal consent. We preserve the dignity and privacy of every student while documenting authentic stories of overcoming anxiety, mastering habits, and stepping up as community leaders.
        </p>
      </section>

      {/* CTA */}
      <CTASection
        title="Help Us Expand Community Impact"
        subtitle="Bring an Evolve Club service initiative to your university, neighbourhood, or local youth group."
        primaryCtaText="Volunteer With Us"
        primaryCtaTo="/get-involved"
        secondaryCtaText="Contact Us"
        secondaryCtaTo="/contact"
      />
    </div>
  );
};

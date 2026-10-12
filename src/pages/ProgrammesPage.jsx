import React, { useState, useEffect } from 'react';
import { Search, Filter, Sparkles, AlertCircle, Compass } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { ProgrammeCard } from '../components/common/ProgrammeCard';
import { LoadingIndicator } from '../components/common/LoadingIndicator';
import { EmptyState } from '../components/common/EmptyState';
import { CTASection } from '../components/sections/CTASection';
import { api } from '../services/api';

const categories = [
  'All',
  'Leadership Development',
  'Life Skills',
  'Purposeful Living',
  'Healthy Habits and Well-being',
  'Practical Bhagavad Gita Wisdom',
  'Youth Mentorship',
  'Community Service',
  'Addiction Awareness and Responsible Choices'
];

export const ProgrammesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        setLoading(true);
        const params = {};
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (searchQuery.trim()) params.search = searchQuery.trim();

        const response = await api.getProgrammes(params);
        if (response.data?.programmes) {
          setProgrammes(response.data.programmes);
        }
      } catch (err) {
        console.error('Failed to load programmes:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProgrammes, 250);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-cream-50 text-forest-950 pt-24">
      {/* Header Banner */}
      <section className="bg-forest-950 text-cream-50 py-20 relative overflow-hidden border-b border-gold-500/20">
        <div className="absolute inset-0 bg-grain opacity-20" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400">
            <Compass className="w-3.5 h-3.5" />
            <span>Holistic Curriculum & Cohorts</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50">
            Programmes for <span className="gold-text-gradient">Every Stage</span> of Growth
          </h1>

          <p className="text-lg sm:text-xl text-cream-200/90 max-w-3xl mx-auto font-light leading-relaxed">
            From cognitive mastery and habit formation to ethical leadership and community service.
          </p>
        </div>
      </section>

      {/* Notice Banner: Transparent Curriculum Disclosure */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm text-forest-900 font-medium">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Curriculum overview represents active cohorts and upcoming pilot modules. Enrolment is opened on a seasonal basis.
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-cream-300">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-forest-800/50 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, keyword, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-forest-800/20 text-sm text-forest-950 placeholder-forest-800/40 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all shadow-sm"
            />
          </div>

          <div className="text-xs text-forest-800/70 font-mono">
            Showing {programmes.length} {programmes.length === 1 ? 'programme' : 'programmes'}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-6">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isSelected
                    ? 'bg-forest-900 text-gold-400 border border-gold-500/50 shadow-sm'
                    : 'bg-white text-forest-800 hover:bg-forest-900/5 border border-forest-800/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Programmes Grid */}
        <div className="mt-12">
          {loading ? (
            <LoadingIndicator text="Fetching curriculum details..." />
          ) : programmes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programmes.map((p) => (
                <ProgrammeCard key={p.slug} programme={p} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No programmes found"
              description="No matching curriculum items found for your selected filters. Try choosing 'All' or a different search term."
              actionText="Reset Filters"
              actionOnClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            />
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to enrol or propose a cohort?"
        subtitle="We partner with colleges, universities, and student groups to organize custom delivery schedules."
        primaryCtaText="Register Interest"
        primaryCtaTo="/get-involved"
        secondaryCtaText="Contact Us"
        secondaryCtaTo="/contact"
      />
    </div>
  );
};

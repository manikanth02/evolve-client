import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Sparkles, Compass, Lightbulb, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { ArticleCard } from '../components/common/ArticleCard';
import { LoadingIndicator } from '../components/common/LoadingIndicator';
import { EmptyState } from '../components/common/EmptyState';
import { CTASection } from '../components/sections/CTASection';
import { api } from '../services/api';

const categories = [
  'All',
  'Bhagavad Gita Wisdom',
  'Mind & Emotional Balance',
  'Modern Leadership',
  'Purpose & Self-Discovery',
  'Habits & Character',
  'Service & Compassion'
];

export const WisdomHubPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const params = {};
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (searchQuery.trim()) params.search = searchQuery.trim();

        const res = await api.getArticles(params);
        if (res.data?.articles) {
          setArticles(res.data.articles);
        }
      } catch (err) {
        console.error('Failed to load articles:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchArticles, 250);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-cream-50 text-forest-950 pt-24">
      {/* Header Banner */}
      <section className="bg-forest-950 text-cream-50 py-20 relative overflow-hidden border-b border-gold-500/20">
        <div className="absolute inset-0 bg-grain opacity-20" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold-500/10 border border-gold-500/30 text-gold-400">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Timeless Wisdom for Modern Youth</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50">
            The <span className="gold-text-gradient">Wisdom Hub</span>
          </h1>

          <p className="text-lg sm:text-xl text-cream-200/90 max-w-3xl mx-auto font-light leading-relaxed">
            Practical verses from the Bhagavad Gita, psychological commentaries, and reflective guides for inner poise and disciplined action.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-cream-300">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-forest-800/50 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search verses, keywords, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-forest-800/20 text-sm text-forest-950 placeholder-forest-800/40 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all shadow-sm"
            />
          </div>

          <div className="text-xs text-forest-800/70 font-mono">
            Showing {articles.length} {articles.length === 1 ? 'article' : 'articles'}
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

        {/* Articles Grid */}
        <div className="mt-12">
          {loading ? (
            <LoadingIndicator text="Loading wisdom articles..." />
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((art) => (
                <ArticleCard key={art.slug} article={art} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={BookOpen}
              title="No articles found"
              description="No articles or reflections matched your search criteria. Try selecting 'All' or a different query."
              actionText="Reset Filters"
              actionOnClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            />
          )}
        </div>
      </section>

      {/* External Resources Spotlight */}
      <section className="py-16 bg-cream-100 border-t border-gold-500/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center mx-auto">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-forest-950">
            Recommended Daily Study Discipline
          </h3>
          <p className="text-sm sm:text-base text-forest-800/80 max-w-2xl mx-auto leading-relaxed">
            Wisdom transforms life not by bulk consumption, but by deep contemplation of a single verse every morning followed by active practice throughout the day.
          </p>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Deepen Your Personal Practice"
        subtitle="Join our weekly wisdom circle to discuss Gita verses, real dilemmas, and modern applications with fellow seekers."
        primaryCtaText="Join A Wisdom Circle"
        primaryCtaTo="/get-involved"
        secondaryCtaText="Ask A Question"
        secondaryCtaTo="/contact"
      />
    </div>
  );
};

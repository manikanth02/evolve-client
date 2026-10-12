import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Sparkles, Calendar, CheckCircle2, Share2, Quote } from 'lucide-react';
import { Button } from '../components/common/Button';
import { LoadingIndicator } from '../components/common/LoadingIndicator';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { api } from '../services/api';

export const WisdomDetailPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.getArticleBySlug(slug);
        if (res.data) {
          setArticle(res.data);
        } else {
          setError('Wisdom article not found');
        }
      } catch (err) {
        setError('Unable to load wisdom article.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 pb-20">
        <LoadingIndicator text="Loading wisdom article..." />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 pb-20 px-4">
        <ErrorMessage message={error || 'Article not found'} />
        <div className="text-center mt-6">
          <Link to="/wisdom-hub" className="text-gold-600 hover:text-gold-700 font-medium inline-flex items-center gap-1.5 text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Wisdom Hub</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 text-forest-950 pt-24 pb-20">
      {/* Back button link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between">
        <Link
          to="/wisdom-hub"
          className="inline-flex items-center gap-2 text-sm font-semibold text-forest-800 hover:text-gold-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Wisdom Hub</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-forest-800/20 hover:border-gold-500/50 text-forest-900 shadow-sm transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
        </button>
      </div>

      {/* Main Content Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Block */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-gold-500/10 text-gold-600 border border-gold-500/30">
              {article.category}
            </span>
            {article.publishedAt && (
              <span className="flex items-center gap-1 text-xs text-forest-800/60 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-950 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-forest-800/80 leading-relaxed font-light">
            {article.excerpt}
          </p>
        </div>

        {/* Featured Image */}
        {article.image && (
          <div className="w-full h-72 sm:h-96 rounded-3xl overflow-hidden mb-10 shadow-md">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Verse Reference Callout Card */}
        {article.verseReference && (
          <div className="bg-forest-950 text-cream-50 p-6 sm:p-8 rounded-3xl border border-gold-500/40 mb-10 shadow-forest-deep relative">
            <Quote className="w-12 h-12 text-gold-500/20 absolute top-4 right-4 pointer-events-none" />
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-gold-400">
                <Sparkles className="w-3.5 h-3.5" />
                {article.verseReference}
              </span>

              {article.verseText && (
                <p className="font-serif text-base sm:text-lg text-gold-300 italic whitespace-pre-line leading-relaxed">
                  {article.verseText}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Practical Application Banner */}
        {article.practicalApplication && (
          <div className="bg-amber-500/10 border-l-4 border-gold-500 p-6 rounded-r-2xl mb-10 space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-forest-950">
              Direct Modern Application Step
            </h4>
            <p className="text-sm sm:text-base text-forest-900 leading-relaxed font-medium">
              {article.practicalApplication}
            </p>
          </div>
        )}

        {/* Main Article Body */}
        <div className="prose prose-lg max-w-none text-forest-900 leading-relaxed whitespace-pre-line space-y-4">
          {article.content}
        </div>

        {/* Footer Navigation */}
        <div className="mt-14 pt-8 border-t border-cream-300 flex items-center justify-between">
          <Link
            to="/wisdom-hub"
            className="text-sm font-semibold text-gold-600 hover:text-gold-700 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>More Wisdom Reflections</span>
          </Link>

          <Link
            to="/get-involved"
            className="text-sm font-semibold text-forest-900 hover:text-gold-600 transition-colors"
          >
            Join Our Wisdom Circle →
          </Link>
        </div>
      </article>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Sparkles, Calendar, CheckCircle2, Share2, Quote, User, Clock } from 'lucide-react';
import { Button } from '../components/common/Button';
import { LoadingIndicator } from '../components/common/LoadingIndicator';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { ArticleContentRenderer } from '../components/common/ArticleContentRenderer';
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
          <Link to="/programmes#wisdom-reflections" className="text-gold-600 hover:text-gold-700 font-medium inline-flex items-center gap-1.5 text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Programmes & Wisdom</span>
          </Link>
        </div>
      </div>
    );
  }

  const cleanExcerpt = article.excerpt ? article.excerpt.replace(/[*#_`~>]/g, '').trim() : '';

  return (
    <div className="min-h-screen bg-cream-50 text-forest-950 pt-20 sm:pt-24 pb-14 sm:pb-20">
      {/* Back button link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 flex items-center justify-between gap-2">
        <Link
          to="/programmes#wisdom-reflections"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-forest-800 hover:text-gold-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Back to Programmes & Wisdom</span>
          <span className="sm:hidden">Back to Wisdom</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 sm:px-3 py-1.5 rounded-full bg-white border border-forest-800/20 hover:border-gold-500/50 text-forest-900 shadow-sm transition-all shrink-0"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
        </button>
      </div>

      {/* Main Content Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header Block */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase bg-gold-500/10 text-gold-600 border border-gold-500/30">
              {article.category}
            </span>
            {article.author && (
              <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-forest-900 font-semibold bg-forest-900/5 px-2.5 py-0.5 sm:py-1 rounded-full border border-forest-900/10">
                <User className="w-3.5 h-3.5 text-gold-600" />
                <span>{article.author}</span>
              </span>
            )}
            {article.readTime && (
              <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-forest-800/70 font-mono">
                <Clock className="w-3.5 h-3.5 text-gold-600" />
                <span>{article.readTime}</span>
              </span>
            )}
            {article.publishedAt && (
              <span className="hidden sm:flex items-center gap-1 text-xs text-forest-800/60 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            )}
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-forest-950 tracking-tight leading-tight">
            {article.title}
          </h1>

          {cleanExcerpt && (
            <p className="text-base sm:text-xl text-forest-800/80 leading-relaxed font-light">
              {cleanExcerpt}
            </p>
          )}
        </div>

        {/* Featured Image - Preserves Complete Artwork Without Cropping */}
        {article.image && (
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-10 shadow-xl bg-forest-950 border border-gold-500/20 flex items-center justify-center p-2 sm:p-5 min-h-[200px] sm:min-h-[280px] max-h-[640px]">
            {/* Ambient Blurred Backdrop for full cinematic depth without dead bars */}
            <div
              className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-110 pointer-events-none"
              style={{ backgroundImage: `url("${article.image}")` }}
            />
            {/* Full Uncropped High-Res Image */}
            <img
              src={article.image}
              alt={article.title}
              className="relative z-10 max-h-[580px] w-auto max-w-full rounded-xl sm:rounded-2xl object-contain shadow-2xl mx-auto transition-transform duration-500"
            />
          </div>
        )}

        {/* Verse Reference Callout Card */}
        {article.verseReference && (
          <div className="bg-forest-950 text-cream-50 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-gold-500/40 mb-8 sm:mb-10 shadow-forest-deep relative">
            <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-gold-500/20 absolute top-3 sm:top-4 right-3 sm:right-4 pointer-events-none" />
            <div className="space-y-2.5 sm:space-y-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold uppercase text-gold-400">
                <Sparkles className="w-3.5 h-3.5" />
                {article.verseReference}
              </span>

              {article.verseText && (
                <p className="font-serif text-sm sm:text-lg text-gold-300 italic whitespace-pre-line leading-relaxed">
                  {article.verseText}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Practical Application Banner */}
        {article.practicalApplication && (
          <div className="bg-amber-500/10 border-l-4 border-gold-500 p-4 sm:p-6 rounded-r-xl sm:rounded-r-2xl mb-8 sm:mb-10 space-y-1.5 sm:space-y-2">
            <h4 className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-forest-950">
              Direct Modern Application Step
            </h4>
            <p className="text-xs sm:text-base text-forest-900 leading-relaxed font-medium">
              {article.practicalApplication}
            </p>
          </div>
        )}

        {/* Main Article Body Rendered with ArticleContentRenderer */}
        <div className="max-w-none text-forest-900 leading-relaxed">
          <ArticleContentRenderer content={article.content} />
        </div>

        {/* Footer Navigation */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-cream-300 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <Link
            to="/programmes#wisdom-reflections"
            className="text-xs sm:text-sm font-semibold text-gold-600 hover:text-gold-700 flex items-center gap-1.5 py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>More Wisdom Reflections</span>
          </Link>

          <Link
            to="/get-involved"
            className="text-xs sm:text-sm font-semibold text-forest-900 hover:text-gold-600 transition-colors py-1"
          >
            Join Our Wisdom Circle →
          </Link>
        </div>
      </article>
    </div>
  );
};

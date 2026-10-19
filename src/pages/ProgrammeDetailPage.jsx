import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Compass, Calendar, CheckCircle2, ArrowRight, Sparkles, BookOpen, Clock } from 'lucide-react';
import { Button } from '../components/common/Button';
import { LoadingIndicator } from '../components/common/LoadingIndicator';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { api } from '../services/api';

export const ProgrammeDetailPage = () => {
  const { slug } = useParams();
  const [programme, setProgramme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgramme = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.getProgrammeBySlug(slug);
        if (res.data) {
          setProgramme(res.data);
        } else {
          setError('Programme curriculum not found');
        }
      } catch (err) {
        setError('Unable to load programme details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgramme();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 pb-20">
        <LoadingIndicator text="Loading curriculum..." />
      </div>
    );
  }

  if (error || !programme) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 pb-20 px-4">
        <ErrorMessage message={error || 'Programme not found'} />
        <div className="text-center mt-6">
          <Link to="/programmes" className="text-gold-600 hover:text-gold-700 font-medium inline-flex items-center gap-1.5 text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Programmes</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 text-forest-950 pt-20 sm:pt-24">
      {/* Back button link */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        <Link
          to="/programmes"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-forest-800 hover:text-gold-600 transition-colors py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Programmes</span>
        </Link>
      </div>

      {/* Main Content Article */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header Block */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold uppercase bg-gold-500/10 text-gold-600 border border-gold-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{programme.category}</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-5xl font-bold text-forest-950 tracking-tight leading-tight">
            {programme.title}
          </h1>

          <p className="text-sm sm:text-xl text-forest-800/80 leading-relaxed font-light">
            {programme.shortDescription}
          </p>

          {programme.deliveryFormats && programme.deliveryFormats.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 sm:pt-2">
              <span className="text-[11px] sm:text-xs uppercase font-mono text-forest-700/60 font-semibold mr-1">
                Formats:
              </span>
              {programme.deliveryFormats.map((fmt, i) => (
                <span
                  key={i}
                  className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-forest-900 text-cream-50 text-xs font-medium"
                >
                  {fmt}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Feature Image Banner */}
        {programme.image && (
          <div className="w-full h-48 sm:h-72 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-12 shadow-md">
            <img
              src={programme.image}
              alt={programme.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Description Body & Application */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Copy */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-6">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest-950">
              Curriculum Overview & Philosophy
            </h2>

            <div className="prose prose-sm sm:prose-lg text-forest-800/90 leading-relaxed whitespace-pre-line">
              {programme.description}
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-gold-500/20 shadow-sm space-y-2.5 sm:space-y-3 mt-6 sm:mt-8">
              <div className="flex items-center gap-2 text-forest-950 font-serif text-base sm:text-lg font-bold">
                <Compass className="w-5 h-5 text-gold-500" />
                <span>Our Teaching Methodology</span>
              </div>
              <p className="text-xs sm:text-sm text-forest-800/80 leading-relaxed">
                Every cohort blends philosophical foundations from the Bhagavad Gita with experiential exercises, cognitive journaling, peer dialogue, and accountable habit tracking.
              </p>
            </div>
          </div>

          {/* Sidebar CTA Card */}
          <div className="lg:col-span-4">
            <div className="bg-forest-950 text-cream-50 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gold-500/30 sticky top-24 sm:top-28 space-y-5 sm:space-y-6 shadow-forest-deep">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400">
                  Cohort Enrolment
                </span>
                <h3 className="font-serif text-xl font-bold text-cream-50">
                  Join or Host This Programme
                </h3>
                <p className="text-xs text-cream-200/70 leading-relaxed">
                  Open to university students, recent graduates, youth clubs, and learning circles.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Button
                  to={`/get-involved?programme=${encodeURIComponent(programme.title)}`}
                  variant="gold"
                  size="md"
                  className="w-full"
                  icon={ArrowRight}
                >
                  Apply For Next Cohort
                </Button>

                <Button
                  to="/for-organisations"
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                >
                  Request For Organisation
                </Button>
              </div>

              <div className="pt-4 border-t border-forest-800 text-[11px] text-cream-200/50 text-center">
                Chandigarh · Mohali · Hybrid Options Available
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, UserX, Compass } from 'lucide-react';
import { getSpeakerBySlug } from '../data/speakers';
import { SpeakerProfile } from '../components/speakers/SpeakerProfile';
import { Button } from '../components/common/Button';

export const SpeakerProfilePage = () => {
  const { slug } = useParams();
  const speaker = getSpeakerBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (speaker) {
      document.title = `${speaker.name} — Speaker & Mentor Profile | Evolve Club`;
    } else {
      document.title = 'Speaker Not Found | Evolve Club';
    }
  }, [speaker, slug]);

  if (!speaker) {
    return (
      <div className="min-h-screen bg-cream-50 text-forest-950 pt-28 pb-16 px-4">
        <div className="max-w-xl mx-auto bg-white p-6 sm:p-12 rounded-3xl border border-gold-500/30 shadow-lg text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-forest-900 text-gold-400 flex items-center justify-center mx-auto">
            <UserX className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
            Speaker Profile Not Found
          </h2>
          <p className="text-xs sm:text-sm text-forest-800/80 leading-relaxed">
            The requested speaker or mentor profile could not be found. Please browse our active mentors on the Our Speakers page.
          </p>
          <Button to="/speakers" variant="gold" size="md" icon={ArrowLeft} className="w-full sm:w-auto justify-center">
            Return to Our Speakers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 text-forest-950 pt-20 sm:pt-24 pb-16 sm:pb-20">
      {/* Navigation Breadcrumb - Touch friendly on mobile */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <Link
          to="/speakers"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-forest-800 hover:text-gold-600 transition-colors py-2 active:opacity-75"
        >
          <ArrowLeft className="w-4 h-4 text-gold-600" />
          <span>Back to Our Speakers & Mentors</span>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <SpeakerProfile speaker={speaker} />
      </div>
    </div>
  );
};

export default SpeakerProfilePage;

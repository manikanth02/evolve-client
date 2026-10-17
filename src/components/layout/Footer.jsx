import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Heart, Shield, Sparkles, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-cream-100 border-t border-forest-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-forest-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-forest-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-forest-900 border border-gold-500/40 flex items-center justify-center shadow-gold-glow">
                <Compass className="w-5 h-5 text-gold-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-cream-50">
                EVOLVE <span className="text-gold-400 font-sans font-light">CLUB</span>
              </span>
            </Link>

            <p className="text-cream-200/80 text-sm leading-relaxed max-w-sm">
              Youth Empowerment. Purposeful Living. Lasting Transformation.
              Helping young people grow with wisdom, character, and positive action.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-forest-900/60 border border-gold-500/20 text-xs font-medium text-gold-300">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Motto: LEARN · GROW · SERVE · LEAD</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-cream-50 mb-4 tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-cream-200/70">
              <li>
                <Link to="/our-journey" className="hover:text-gold-400 transition-colors">Our Journey & Ethos</Link>
              </li>
              <li>
                <Link to="/programmes" className="hover:text-gold-400 transition-colors">Our Programmes</Link>
              </li>
              <li>
                <Link to="/programmes#wisdom-reflections" className="hover:text-gold-400 transition-colors">Bhagavad Gita Wisdom</Link>
              </li>
              <li>
                <Link to="/speakers" className="hover:text-gold-400 transition-colors">Our Speakers & Mentors</Link>
              </li>
            </ul>
          </div>

          {/* Collaboration */}
          <div>
            <h4 className="font-serif text-base font-semibold text-cream-50 mb-4 tracking-wide">
              Participate
            </h4>
            <ul className="space-y-2.5 text-sm text-cream-200/70">
              <li>
                <Link to="/for-organisations" className="hover:text-gold-400 transition-colors flex items-center gap-1">
                  <span>For Organisations</span>
                  <ArrowUpRight className="w-3 h-3 text-gold-400/60" />
                </Link>
              </li>
              <li>
                <Link to="/get-involved?interest=Mentorship" className="hover:text-gold-400 transition-colors">Youth Mentorship</Link>
              </li>
              <li>
                <Link to="/get-involved?interest=Volunteering" className="hover:text-gold-400 transition-colors">Volunteer in Seva</Link>
              </li>
              <li>
                <Link to="/get-involved?interest=General+Enquiry" className="hover:text-gold-400 transition-colors">General Enquiries</Link>
              </li>
            </ul>
          </div>

          {/* Core Ethos */}
          <div>
            <h4 className="font-serif text-base font-semibold text-cream-50 mb-4 tracking-wide">
              Our Ethos
            </h4>
            <p className="text-xs text-cream-200/60 leading-relaxed mb-3">
              Evolve Club is an independent youth empowerment initiative. We are dedicated to character education, mental discipline, and social upliftment.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-400/90 font-medium">
              <Shield className="w-3.5 h-3.5" />
              <span>Transparent & Authentic</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/50">
          <p>© {currentYear} Evolve Club. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/get-involved?interest=General+Enquiry" className="hover:text-cream-200 transition-colors">Contact Coordination Team</Link>
            <span>•</span>
            <span className="text-cream-200/40">Chandigarh & Mohali Initiative</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

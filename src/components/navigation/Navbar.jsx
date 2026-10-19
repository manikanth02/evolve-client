import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Compass, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Our Journey', path: '/our-journey' },
    { label: 'Our Speakers', path: '/speakers' },
    { label: 'Our Programmes', path: '/programmes' },
    { label: 'For Organisations', path: '/for-organisations' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-forest-950/90 backdrop-blur-md border-b border-gold-500/20 py-2.5 sm:py-3 shadow-forest-deep'
            : 'bg-gradient-to-b from-forest-950/80 to-transparent py-3.5 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0" aria-label="Evolve Club Home">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-forest-900 border border-gold-500/50 flex items-center justify-center shadow-gold-glow group-hover:border-gold-400 transition-all">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-2xl font-bold tracking-wider text-cream-50 group-hover:text-gold-300 transition-colors leading-tight">
                  EVOLVE <span className="text-gold-400 font-sans font-light">CLUB</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gold-400/80 font-medium hidden sm:block">
                  LEARN · GROW · SERVE · LEAD
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Primary Desktop Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-gold-400 bg-forest-900/80 border border-gold-500/30'
                        : 'text-cream-200/80 hover:text-cream-50 hover:bg-forest-900/40'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Container - Exactly One Prominent "Get Involved" CTA */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Button
                to="/get-involved"
                variant="gold"
                size="sm"
                icon={ArrowRight}
                className="text-[11px] px-2.5 py-1.5 sm:text-xs sm:px-4 sm:py-2 min-h-[36px] sm:min-h-[40px]"
              >
                Get Involved
              </Button>

              {/* Mobile Hamburger Button */}
              <div className="flex lg:hidden items-center">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 sm:p-2 rounded-lg text-cream-100 hover:text-gold-400 hover:bg-forest-900/60 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400/50"
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-navigation"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="fixed inset-0 bg-forest-950/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`fixed top-0 right-0 bottom-0 w-full max-w-xs bg-forest-950 border-l border-gold-500/30 shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-forest-800">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-gold-400" />
                <span className="font-serif text-lg font-bold text-cream-50">EVOLVE CLUB</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-cream-300 hover:text-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1.5 mt-6" aria-label="Mobile Navigation Links">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'text-gold-400 bg-forest-900/90 font-semibold border-l-4 border-gold-400'
                        : 'text-cream-200 hover:text-cream-50 hover:bg-forest-900/50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-forest-800 space-y-3">
            <Button
              to="/get-involved"
              variant="gold"
              size="md"
              className="w-full justify-center min-h-[44px]"
              icon={ArrowRight}
            >
              Get Involved
            </Button>
            <p className="text-center text-[11px] text-cream-200/50 uppercase tracking-widest font-mono">
              LEARN · GROW · SERVE · LEAD
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

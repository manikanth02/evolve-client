import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { OurJourneyPage } from './pages/OurJourneyPage';
import { ProgrammesPage } from './pages/ProgrammesPage';
import { ProgrammeDetailPage } from './pages/ProgrammeDetailPage';
import { WisdomDetailPage } from './pages/WisdomDetailPage';
import { ForOrganisationsPage } from './pages/ForOrganisationsPage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';
import { SpeakersPage } from './pages/SpeakersPage';
import { SpeakerProfilePage } from './pages/SpeakerProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on every route transition
const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const elem = document.querySelector(hash);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, search, hash]);

  return null;
};

export const App = () => {
  const location = useLocation();

  const validStaticRoutes = [
    '/',
    '/our-journey',
    '/our-story',
    '/speakers',
    '/impact',
    '/programmes',
    '/wisdom-hub',
    '/for-organisations',
    '/get-involved',
    '/contact'
  ];

  const isValidRoute =
    validStaticRoutes.includes(location.pathname) ||
    location.pathname.startsWith('/programmes/') ||
    location.pathname.startsWith('/wisdom-hub/') ||
    location.pathname.startsWith('/speakers/');

  const is404 = !isValidRoute;

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!is404 && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Main Consolidated Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/our-journey" element={<OurJourneyPage />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/programmes" element={<ProgrammesPage />} />
          <Route path="/programmes/:slug" element={<ProgrammeDetailPage />} />
          <Route path="/for-organisations" element={<ForOrganisationsPage />} />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="/speakers/:slug" element={<SpeakerProfilePage />} />

          {/* Graceful Aliases and Compatibility Redirects for Previous Routes */}
          <Route path="/our-story" element={<Navigate to="/our-journey" replace />} />
          <Route path="/impact" element={<Navigate to="/our-journey" replace />} />
          <Route path="/wisdom-hub" element={<Navigate to="/programmes" replace />} />
          <Route path="/wisdom-hub/:slug" element={<WisdomDetailPage />} />
          <Route path="/contact" element={<Navigate to="/get-involved" replace />} />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!is404 && <Footer />}
    </div>
  );
};

export default App;

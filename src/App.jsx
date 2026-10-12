import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { OurStoryPage } from './pages/OurStoryPage';
import { ProgrammesPage } from './pages/ProgrammesPage';
import { ProgrammeDetailPage } from './pages/ProgrammeDetailPage';
import { WisdomHubPage } from './pages/WisdomHubPage';
import { WisdomDetailPage } from './pages/WisdomDetailPage';
import { ImpactPage } from './pages/ImpactPage';
import { ForOrganisationsPage } from './pages/ForOrganisationsPage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on every route transition
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App = () => {
  const location = useLocation();
  const is404 = location.pathname !== '/' &&
    !['/our-story', '/programmes', '/wisdom-hub', '/impact', '/for-organisations', '/get-involved', '/contact'].includes(location.pathname) &&
    !location.pathname.startsWith('/programmes/') &&
    !location.pathname.startsWith('/wisdom-hub/');

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!is404 && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/programmes" element={<ProgrammesPage />} />
          <Route path="/programmes/:slug" element={<ProgrammeDetailPage />} />
          <Route path="/wisdom-hub" element={<WisdomHubPage />} />
          <Route path="/wisdom-hub/:slug" element={<WisdomDetailPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/for-organisations" element={<ForOrganisationsPage />} />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!is404 && <Footer />}
    </div>
  );
};

export default App;

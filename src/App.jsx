import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import FloorPlansPage from './pages/FloorPlansPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import VirtualTourPage from './pages/VirtualTourPage';
import './index.css';

/**
 * Layout wrapper that conditionally shows Header and Footer
 */
function Layout() {
  const location = useLocation();
  const isVirtualTour = location.pathname === '/virtual-tour';

  return (
    <div className="flex flex-col min-h-screen">
      {!isVirtualTour && <Header />}
      <main className={isVirtualTour ? '' : 'flex-grow'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/floor-plans" element={<FloorPlansPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/virtual-tour" element={<VirtualTourPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      {!isVirtualTour && <Footer />}
    </div>
  );
}

/**
 * Main App component with routing
 */
function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;

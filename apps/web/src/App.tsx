import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import MarketingCarousel from './components/MarketingCarousel';
import Leaderboard from './components/Leaderboard';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import FAQ from './pages/FAQ';
import Help from './pages/Help';
import './App.css';

interface LegalPageProps {
  children: React.ReactNode;
}

function HomePage(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <MarketingCarousel />
        <Leaderboard />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function LegalPage({ children }: LegalPageProps): JSX.Element {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={
            <LegalPage>
              <Privacy />
            </LegalPage>
          } />
          <Route path="/terms" element={
            <LegalPage>
              <Terms />
            </LegalPage>
          } />
          <Route path="/cookies" element={
            <LegalPage>
              <Cookies />
            </LegalPage>
          } />
          <Route path="/faq" element={
            <LegalPage>
              <FAQ />
            </LegalPage>
          } />
          <Route path="/help" element={
            <LegalPage>
              <Help />
            </LegalPage>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
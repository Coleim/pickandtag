import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AppLayout } from './app/AppLayout';
import HomePage from './features/landing/pages/HomePage';
import Cookies from './features/legal/pages/Cookies';
import FAQ from './features/legal/pages/FAQ';
import Help from './features/legal/pages/Help';
import LegalPage from './features/legal/pages/LegalPage';
import Privacy from './features/legal/pages/Privacy';
import Terms from './features/legal/pages/Terms';
import LocationRankingPage from './features/profile/pages/LocationRankingPage';
import PlayerProfilePage from './features/profile/pages/PlayerProfilePage';
import PlayerRankingPage from './features/profile/pages/PlayerRankingPage';
import PlayerSearchPage from './features/profile/pages/PlayerSearchPage';

function App() {

  const getBasename = () => {
    const hostname = window.location.hostname;

    if (hostname.includes('github.io')) {
      return '/pickandtag';
    }

    return '/';
  };

  return (
    <BrowserRouter basename={getBasename()}>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="players" replace />} />
            <Route path="players" element={<PlayerSearchPage />} />
            <Route path="players/:id" element={<PlayerProfilePage />} />
            <Route path="player-rankings" element={<PlayerRankingPage />} />
            <Route path="location-rankings" element={<LocationRankingPage />} />
          </Route>


          <Route path="/privacy" element={<LegalPage><Privacy /></LegalPage>} />
          <Route path="/terms" element={<LegalPage><Terms /></LegalPage>} />
          <Route path="/cookies" element={<LegalPage><Cookies /></LegalPage>} />
          <Route path="/faq" element={<LegalPage><FAQ /></LegalPage>} />
          <Route path="/help" element={<LegalPage><Help /></LegalPage>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

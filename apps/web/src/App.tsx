import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AppLayout } from './app/AppLayout';
import HomePage from './features/landing/pages/HomePage';
import Cookies from './features/legal/pages/Cookies';
import FAQ from './features/legal/pages/FAQ';
import Help from './features/legal/pages/Help';
import LegalPage from './features/legal/pages/LegalPage';
import Privacy from './features/legal/pages/Privacy';
import Terms from './features/legal/pages/Terms';
import PlayerProfilePage from './features/profile/pages/PlayerProfilePage';

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
            <Route index element={<PlayerProfilePage />} />
            {/* <Route path="players" element={<Players />} /> */}
            {/* <Route path="player-rankings" element={<PlayerRankings />} /> */}
            {/* <Route path="location-rankings" element={<LocationRankings />} /> */}
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

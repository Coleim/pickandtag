import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './features/landing/pages/HomePage';
import Cookies from './features/legal/pages/Cookies';
import FAQ from './features/legal/pages/FAQ';
import Help from './features/legal/pages/Help';
import LegalPage from './features/legal/pages/LegalPage';
import Privacy from './features/legal/pages/Privacy';
import Terms from './features/legal/pages/Terms';
import PlayerProfilePage from './features/profile/pages/PlayerProfilePage';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* <Route path="/dashboard" element={<GameDashboard />} /> */}
          <Route path="/player/:id" element={<PlayerProfilePage />} />


          <Route path="/privacy" element={<LegalPage><Privacy /></LegalPage>} />
          <Route path="/terms" element={<LegalPage><Terms /></LegalPage>} />
          <Route path="/cookies" element={<LegalPage><Cookies /></LegalPage>} />
          <Route path="/faq" element={<LegalPage><FAQ /></LegalPage>} />
          <Route path="/help" element={<LegalPage><Help /></LegalPage>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

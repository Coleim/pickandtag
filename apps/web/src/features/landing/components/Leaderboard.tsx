import { motion } from 'framer-motion';
import './Leaderboard.css';

const Leaderboard = () => {
  return (
    <section id="leaderboard" className="leaderboard">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Classement des Champions</h2>
          <p className="section-subtitle">
            Découvre les plus grands collecteurs de déchets de la communauté
          </p>
        </motion.div>

        <motion.div
          className="coming-soon-container"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="coming-soon-card">
            <motion.div
              className="coming-soon-icon"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              🏆
            </motion.div>

            <h3 className="coming-soon-title">Disponible maintenant !</h3>
            <p className="coming-soon-description">
              Consulte le classement en temps réel et défie tes amis pour grimper dans les rangs !
            </p>

            <div className="coming-soon-features">
              <a href="https://pickandtag.onrender.com/app" className="feature-item feature-link" target="_blank" rel="noopener noreferrer">
                <span className="feature-icon">📊</span>
                <span>Classement en temps réel</span>
              </a>
              <div className="feature-item feature-coming-soon">
                <span className="feature-icon">👥</span>
                <span>Défis entre amis</span>
                <span className="coming-soon-badge">Bientôt</span>
              </div>
              <div className="feature-item feature-coming-soon">
                <span className="feature-icon">🏅</span>
                <span>Badges exclusifs</span>
                <span className="coming-soon-badge">Bientôt</span>
              </div>
            </div>
            {/* <motion.div
              className="progress-bar"
              initial={{ width: 0 }}
              whileInView={{ width: "75%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              <div className="progress-fill"></div>
            </motion.div> */}

            {/* <p className="progress-text">Développement en cours... 75%</p> */}
          </div>
        </motion.div>

        <motion.div
          className="future-sections"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="future-title">Prochaines fonctionnalités</h3>
          <div className="future-grid">
            <div className="future-card">
              <div className="future-icon">📈</div>
              <h4>Statistiques détaillées</h4>
              <p>Analyse ton impact environnemental avec des graphiques et métriques précises</p>
            </div>

            <div className="future-card">
              <div className="future-icon">🎮</div>
              <h4>Mini-jeux</h4>
              <p>Des défis ludiques pour rendre la collecte encore plus amusante</p>
            </div>

            <div className="future-card">
              <div className="future-icon">🌍</div>
              <h4>Impact global</h4>
              <p>Vois l'impact collectif de toute la communauté sur l'environnement</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Leaderboard;

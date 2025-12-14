import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EmailForm from './EmailForm';
import './Hero.css';

const Hero = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = (success) => {
    setIsSubmitted(success);
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ramasse, Tag, Progresse !
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Pick and Tag transforme la collecte de déchets en jeu amusant et collaboratif. 
              Ramasse autour de toi, tag tes collectes, et grimpe dans le classement !
            </motion.p>

            <motion.div 
              className="hero-features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="feature">
                <span className="feature-icon">🎮</span>
                <span>Gamification</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🤝</span>
                <span>Collaboratif</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🌍</span>
                <span>Écologique</span>
              </div>
            </motion.div>

            <motion.div 
              className="hero-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <EmailForm onEmailSubmit={handleEmailSubmit} />
              {isSubmitted && (
                <motion.div 
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  ✅ Merci ! Un email de confirmation vous a été envoyé.
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="app-mockup">
              <img 
                src="assets/app-mockup.png" 
                alt="Interface de l'application Pick and Tag montrant Tritou la mascotte et les fonctionnalités de collecte de déchets"
                className="mockup-image"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

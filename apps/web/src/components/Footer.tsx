import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">
                  <img 
                    src="assets/tritou-appicon.png" 
                    alt="Tritou - Mascotte de Pick and Tag"
                    className="logo-image"
                  />
                </div>
                <span className="logo-text">Pick and Tag</span>
              </div>
              <p className="footer-description">
                Transforme la collecte de déchets en aventure amusante et collaborative. 
                Rejoins la communauté des éco-citoyens !
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4 className="footer-title">Application</h4>
                <ul className="footer-list">
                  <li><a href="/#how-it-works">Comment ça marche</a></li>
                  <li><a href="/#leaderboard">Classement</a></li>
                  <li><a href="/#beta">Rejoindre la bêta</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-title">Support</h4>
                <ul className="footer-list">
                  <li><a href="#contact">Contact</a></li>
                  <li><a href="/faq">FAQ</a></li>
                  <li><a href="/help">Aide</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-title">Légal</h4>
                <ul className="footer-list">
                  <li><a href="/privacy">Confidentialité</a></li>
                  <li><a href="/terms">Conditions d'utilisation</a></li>
                  <li><a href="/cookies">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>&copy; {currentYear} Pick and Tag. Tous droits réservés.</p>
            </div>
            
            {/* <div className="footer-social">
              <a href="#" className="social-link" aria-label="Twitter">
                <span>🐦</span>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <span>📷</span>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <span>💼</span>
              </a>
            </div> */}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

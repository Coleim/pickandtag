import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Header.css';

const Header = (): JSX.Element => {
  return (
    <motion.header 
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="header-content">
          <Link to="/" aria-label="Accueil" className="logo-link">
            <motion.div 
              className="logo"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="logo-icon">
                <img 
                  src="assets/tritou-appicon.png" 
                  alt="Tritou - Mascotte de Pick and Tag"
                  className="logo-image"
                />
              </div>
              <span className="logo-text">Pick and Tag</span>
            </motion.div>
          </Link>
          
          <nav className="nav">
            <a href="/#how-it-works" className="nav-link">Comment ça marche</a>
            <a href="/#leaderboard" className="nav-link">Classement</a>
            <a href="/#contact" className="nav-link">Contact</a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

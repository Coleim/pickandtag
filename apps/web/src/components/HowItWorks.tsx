import React from 'react';
import { motion } from 'framer-motion';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Ramasse',
      description: 'Collecte les déchets autour de toi lors de tes promenades, courses ou sorties.',
      icon: '🗑️',
      color: 'var(--primary)'
    },
    {
      number: '02',
      title: 'Tag',
      description: 'Enregistre ta collecte en quelques secondes dans l\'app avec une photo et une catégorie.',
      icon: '📱',
      color: 'var(--accent)'
    },
    {
      number: '03',
      title: 'Grimpe',
      description: 'Compare tes progrès avec la communauté et monte dans le leaderboard !',
      icon: '🏆',
      color: 'var(--glass)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Comment ça marche ?</h2>
          <p className="section-subtitle">
            Trois étapes simples pour transformer la collecte de déchets en aventure amusante
          </p>
        </motion.div>

        <motion.div
          className="steps-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <div className="step-number">{step.number}</div>
              
              <div className="step-content">
                <div 
                  className="step-icon"
                  style={{ backgroundColor: step.color }}
                >
                  {step.icon}
                </div>
                
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="features-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h4>Objectifs quotidiens <span className="coming-soon-badge">Bientôt</span></h4>
            <p>Défis personnalisés pour maintenir ta motivation</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h4>Communauté <span className="coming-soon-badge">Bientôt</span></h4>
            <p>Partage tes exploits avec d'autres éco-citoyens</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h4>Statistiques</h4>
            <p>Suis ton impact environnemental en temps réel</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🏅</div>
            <h4>Badges <span className="coming-soon-badge">Bientôt</span></h4>
            <p>Débloque des récompenses pour tes actions</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

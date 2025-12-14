import React from 'react';
import { motion } from 'framer-motion';
import './LegalPages.css';

const FAQ = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <motion.div
          className="legal-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>FAQ – Questions fréquentes</h1>

          <section>
            <h2>Qu'est-ce que Pick and Tag ?</h2>
            <p>
              Pick and Tag est une application qui transforme la collecte de déchets en jeu communautaire. Prenez en photo un déchet, catégorisez-le, et placez un tag géolocalisé pour contribuer à la carte collective.
            </p>
          </section>

          <section>
            <h2>Comment gagner des points / XP ?</h2>
            <p>
              Vous gagnez des points en ajoutant des photos valides, en catégorisant correctement, et lorsque vos contributions sont validées par la communauté.
            </p>
          </section>

          <section>
            <h2>Pourquoi ma position est-elle demandée ?</h2>
            <p>
              La géolocalisation permet d'afficher les zones d'action sur la carte et d'organiser des actions locales. Vous pouvez la désactiver à tout moment dans les réglages de votre appareil.
            </p>
          </section>

          <section>
            <h2>Qui peut voir mes photos ?</h2>
            <p>
              Les photos peuvent être visibles par la communauté pour validation et affichage sur la carte, conformément à notre politique de confidentialité.
            </p>
          </section>

          <section>
            <h2>Comment supprimer mes données ?</h2>
            <p>
              Écrivez-nous à <strong>privacy@pickandtag.app</strong> ou via la page Contact pour demander la suppression de vos données.
            </p>
          </section>

          <section>
            <h2>L'app est-elle disponible sur iOS ?</h2>
            <p>
              Une bêta Android est prioritaire. L'iOS arrivera ensuite. Vous pouvez laisser votre email pour être notifié.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;



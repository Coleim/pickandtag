import React from 'react';
import { motion } from 'framer-motion';
import './LegalPages.css';

const Help = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <motion.div
          className="legal-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Aide</h1>

          <section>
            <h2>Prise en main rapide</h2>
            <ol>
              <li>Ouvrez l'app et autorisez la localisation si vous souhaitez placer des tags.</li>
              <li>Prenez une photo nette du déchet.</li>
              <li>Sélectionnez la bonne catégorie et validez.</li>
            </ol>
          </section>

          <section>
            <h2>Problèmes fréquents</h2>
            <ul>
              <li><strong>Photo refusée</strong> : assurez-vous que le déchet est bien visible et correctement cadré.</li>
              <li><strong>Localisation indisponible</strong> : vérifiez les permissions et le GPS de votre appareil.</li>
              <li><strong>Connexion</strong> : réessayez sur un réseau stable (Wi‑Fi ou 4G+).</li>
            </ul>
          </section>

          <section>
            <h2>Contact support</h2>
            <p>
              Pour toute question, écrivez à <strong>support@pickandtag.app</strong> ou utilisez le formulaire de contact sur la page d'accueil.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;



import React from 'react';
import { motion } from 'framer-motion';
import './LegalPages.css';

const Cookies = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <motion.div
          className="legal-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Politique des Cookies</h1>
          <p className="last-updated">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

          <section>
            <h2>1. Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site web ou utilisez une application. 
              Les cookies nous aident à améliorer votre expérience et à comprendre comment vous utilisez nos services.
            </p>
          </section>

          <section>
            <h2>2. Types de cookies utilisés</h2>
            
            <h3>Cookies essentiels</h3>
            <p>
              Ces cookies sont nécessaires au fonctionnement de l'application et ne peuvent pas être désactivés :
            </p>
            <ul>
              <li><strong>Cookies de session :</strong> Maintiennent votre connexion active</li>
              <li><strong>Cookies de sécurité :</strong> Protègent contre les attaques</li>
              <li><strong>Cookies de préférences :</strong> Mémorisent vos paramètres</li>
            </ul>

            <h3>Cookies de performance</h3>
            <p>
              Ces cookies nous aident à comprendre comment vous utilisez l'application :
            </p>
            <ul>
              <li><strong>Analytics :</strong> Statistiques d'utilisation anonymes</li>
              <li><strong>Performance :</strong> Mesure des temps de chargement</li>
              <li><strong>Erreurs :</strong> Détection des problèmes techniques</li>
            </ul>

            <h3>Cookies de fonctionnalité</h3>
            <p>
              Ces cookies améliorent votre expérience utilisateur :
            </p>
            <ul>
              <li><strong>Préférences :</strong> Langue, thème, notifications</li>
              <li><strong>Personnalisation :</strong> Contenu adapté à vos intérêts</li>
              <li><strong>Géolocalisation :</strong> Services basés sur votre position (avec consentement)</li>
            </ul>
          </section>

          <section>
            <h2>3. Cookies tiers</h2>
            <p>
              Nous utilisons également des services tiers qui peuvent placer leurs propres cookies :
            </p>
            <ul>
              <li><strong>Google Analytics :</strong> Analyse du trafic et du comportement</li>
              <li><strong>Formspree :</strong> Gestion des formulaires de contact</li>
              <li><strong>Réseaux sociaux :</strong> Boutons de partage (si présents)</li>
            </ul>
          </section>

          <section>
            <h2>4. Durée de conservation</h2>
            <p>
              Les cookies ont différentes durées de vie :
            </p>
            <ul>
              <li><strong>Cookies de session :</strong> Supprimés à la fermeture de l'application</li>
              <li><strong>Cookies persistants :</strong> Conservés selon leur durée définie (généralement 1 an maximum)</li>
              <li><strong>Cookies de préférences :</strong> Conservés jusqu'à modification ou suppression</li>
            </ul>
          </section>

          <section>
            <h2>5. Gestion des cookies</h2>
            
            <h3>Dans l'application</h3>
            <p>
              Vous pouvez gérer vos préférences de cookies dans les paramètres de l'application :
            </p>
            <ul>
              <li>Paramètres → Confidentialité → Cookies</li>
              <li>Activer/désactiver les cookies non essentiels</li>
              <li>Supprimer tous les cookies</li>
            </ul>

            <h3>Dans votre navigateur</h3>
            <p>
              Vous pouvez également gérer les cookies via votre navigateur :
            </p>
            <ul>
              <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
              <li><strong>Firefox :</strong> Options → Vie privée et sécurité → Cookies</li>
              <li><strong>Safari :</strong> Préférences → Confidentialité → Cookies</li>
            </ul>
          </section>

          <section>
            <h2>6. Conséquences de la désactivation</h2>
            <p>
              Si vous désactivez certains cookies :
            </p>
            <ul>
              <li>Certaines fonctionnalités peuvent ne pas fonctionner correctement</li>
              <li>Vos préférences ne seront pas sauvegardées</li>
              <li>L'expérience utilisateur peut être dégradée</li>
              <li>Les cookies essentiels restent actifs pour le fonctionnement de base</li>
            </ul>
          </section>

          <section>
            <h2>7. Cookies et données personnelles</h2>
            <p>
              Certains cookies peuvent contenir des données personnelles. Ces données sont traitées conformément à notre 
              <a href="/privacy">Politique de Confidentialité</a> et aux réglementations en vigueur (RGPD).
            </p>
          </section>

          <section>
            <h2>8. Mise à jour de cette politique</h2>
            <p>
              Cette politique des cookies peut être mise à jour pour refléter les changements dans nos pratiques ou 
              pour d'autres raisons opérationnelles, légales ou réglementaires.
            </p>
          </section>

          <section>
            <h2>9. Contact</h2>
            <p>
              Pour toute question concernant notre utilisation des cookies :
            </p>
            <p>
              <strong>Email :</strong> pickandtag.app+cookies@gmail.com<br />
              <strong>Adresse :</strong> [Votre adresse]
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Cookies;

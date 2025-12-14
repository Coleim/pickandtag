import React from 'react';
import { motion } from 'framer-motion';
import './LegalPages.css';

const Privacy = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <motion.div
          className="legal-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Politique de Confidentialité – Pick and Tag</h1>
          <p className="last-updated">Dernière mise à jour : 02/10/2025</p>

          <section>
            <h2>Introduction</h2>
            <p>
              Cette politique de confidentialité explique comment <strong>Pick and Tag</strong> collecte, utilise et protège vos données lors de l'utilisation de notre application. En utilisant Pick and Tag, vous acceptez les pratiques décrites ci-dessous.
            </p>
          </section>

          <section>
            <h2>1. Données collectées</h2>
            <p>Lorsque vous utilisez Pick and Tag, nous pouvons collecter :</p>
            <ul>
              <li><strong>Images envoyées par les utilisateurs</strong> : photos des déchets soumises pour catégorisation et validation.</li>
              <li><strong>Géolocalisation précise</strong> : position GPS associée à vos photos afin de placer un tag sur la carte collective.</li>
              <li><strong>Métadonnées minimales</strong> : horodatage (date et heure) et identifiant utilisateur associé à l'image.</li>
              <li><strong>Informations de compte</strong> : adresse e-mail, pseudonyme et données nécessaires à l’authentification.</li>
            </ul>
            <p>
              La collecte de votre localisation n’a lieu qu’avec votre consentement explicite et peut être désactivée dans les réglages de votre appareil.
            </p>
          </section>

          <section>
            <h2>2. Finalités de la collecte</h2>
            <p>Les données collectées sont utilisées pour :</p>
            <ul>
              <li>Permettre la <strong>validation communautaire</strong> des déchets (autres utilisateurs vérifient la bonne catégorisation).</li>
              <li>Attribuer et contrôler les <strong>points / XP</strong> gagnés par les utilisateurs.</li>
              <li>Placer des <strong>tags géolocalisés</strong> sur la carte collective, afin de visualiser et suivre les zones d’action.</li>
              <li>Améliorer les algorithmes de détection et de catégorisation des déchets.</li>
            </ul>
          </section>

          <section>
            <h2>3. Partage des données</h2>
            <p>Nous ne revendons pas vos données. Les partages possibles :</p>
            <ul>
              <li><strong>Validation communautaire</strong> : vos photos et leur position peuvent être affichées à d'autres utilisateurs pour vérification et contribution à la carte.</li>
              <li><strong>Prestataires techniques</strong> : hébergement, stockage, services d'analyse et de sécurité (sous contrat et respectant la confidentialité).</li>
              <li><strong>Obligations légales</strong> : transmission si la loi l'exige ou pour répondre à une demande judiciaire.</li>
            </ul>
          </section>

          <section>
            <h2>4. Durée de conservation</h2>
            <ul>
              <li>Les images et données de localisation sont conservées le temps nécessaire à leur validation et affichage sur la carte.</li>
              <li>Une fois validées, elles peuvent être <strong>anonymisées</strong> et conservées à des fins statistiques ou de recherche.</li>
              <li>Vous pouvez demander la suppression de vos données personnelles à tout moment (voir section Contact).</li>
            </ul>
          </section>

          <section>
            <h2>5. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données contre :
            </p>
            <ul>
              <li>l'accès non autorisé,</li>
              <li>la divulgation,</li>
              <li>la perte ou la modification accidentelle.</li>
            </ul>
          </section>

          <section>
            <h2>6. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul>
              <li><strong>Accès</strong> : obtenir une copie des données que nous détenons sur vous.</li>
              <li><strong>Rectification</strong> : corriger des données inexactes ou incomplètes.</li>
              <li><strong>Suppression</strong> : demander l'effacement de vos données.</li>
              <li><strong>Opposition</strong> : vous opposer à certains traitements.</li>
              <li><strong>Portabilité</strong> : récupérer vos données dans un format lisible par machine.</li>
            </ul>
          </section>

          <section>
            <h2>7. Contact</h2>
            <p>Pour toute question, demande d'accès, rectification ou suppression, contactez :</p>
            <p><strong>Email :</strong> pickandtag.app+privacy@gmail.com</p>
            <p>© <strong>Pick and Tag</strong> — Tous droits réservés.</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;

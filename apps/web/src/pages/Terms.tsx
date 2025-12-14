import React from 'react';
import { motion } from 'framer-motion';
import './LegalPages.css';

const Terms = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <motion.div
          className="legal-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Conditions d'Utilisation</h1>
          <p className="last-updated">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

          <section>
            <h2>1. Acceptation des conditions</h2>
            <p>
              En utilisant l'application Pick and Tag, vous acceptez d'être lié par ces conditions d'utilisation. 
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre application.
            </p>
          </section>

          <section>
            <h2>2. Description du service</h2>
            <p>
              Pick and Tag est une application mobile qui gamifie la collecte de déchets en permettant aux utilisateurs de :
            </p>
            <ul>
              <li>Enregistrer leurs collectes de déchets</li>
              <li>Participer à des défis communautaires</li>
              <li>Suivre leur impact environnemental</li>
              <li>Interagir avec d'autres utilisateurs</li>
            </ul>
          </section>

          <section>
            <h2>3. Compte utilisateur</h2>
            <p>Pour utiliser l'application, vous devez :</p>
            <ul>
              <li>Créer un compte avec des informations exactes</li>
              <li>Maintenir la sécurité de votre compte</li>
              <li>Être responsable de toutes les activités sous votre compte</li>
              <li>Notifier immédiatement toute utilisation non autorisée</li>
            </ul>
          </section>

          <section>
            <h2>4. Utilisation acceptable</h2>
            <p>Vous vous engagez à :</p>
            <ul>
              <li>Utiliser l'application conformément à la loi</li>
              <li>Ne pas publier de contenu offensant ou illégal</li>
              <li>Respecter les autres utilisateurs</li>
              <li>Ne pas tenter de compromettre la sécurité de l'application</li>
              <li>Ne pas utiliser l'application à des fins commerciales sans autorisation</li>
            </ul>
          </section>

          <section>
            <h2>5. Contenu utilisateur</h2>
            <p>
              Vous conservez les droits sur le contenu que vous publiez. En publiant du contenu, vous nous accordez 
              une licence non exclusive pour l'utiliser dans le cadre de nos services.
            </p>
          </section>

          <section>
            <h2>6. Propriété intellectuelle</h2>
            <p>
              L'application Pick and Tag et son contenu sont protégés par les droits d'auteur et autres droits de propriété intellectuelle. 
              Vous ne pouvez pas copier, modifier ou distribuer notre contenu sans autorisation.
            </p>
          </section>

          <section>
            <h2>7. Limitation de responsabilité</h2>
            <p>
              Pick and Tag est fourni "en l'état". Nous ne garantissons pas que l'application sera exempte d'erreurs ou 
              disponible en permanence. Nous ne serons pas responsables des dommages indirects ou consécutifs.
            </p>
          </section>

          <section>
            <h2>8. Suspension et résiliation</h2>
            <p>
              Nous nous réservons le droit de suspendre ou résilier votre compte en cas de violation de ces conditions. 
              Vous pouvez également résilier votre compte à tout moment.
            </p>
          </section>

          <section>
            <h2>9. Modifications des conditions</h2>
            <p>
              Nous pouvons modifier ces conditions d'utilisation. Les modifications importantes vous seront notifiées 
              et votre utilisation continue de l'application constituera une acceptation des nouvelles conditions.
            </p>
          </section>

          <section>
            <h2>10. Droit applicable</h2>
            <p>
              Ces conditions sont régies par le droit français. Tout litige sera soumis à la juridiction des tribunaux français.
            </p>
          </section>

          <section>
            <h2>11. Contact</h2>
            <p>
              Pour toute question concernant ces conditions d'utilisation :
            </p>
            <p>
              <strong>Email :</strong> pickandtag.app+legal@gmail.com<br />
              <strong>Adresse :</strong> [Votre adresse]
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;

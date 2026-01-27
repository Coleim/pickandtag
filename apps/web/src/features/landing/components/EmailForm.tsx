import { motion } from 'framer-motion';
import './EmailForm.css';

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.coleim.pickandtag';

const EmailForm = () => {
  return (
    <motion.div
      className="google-play-download"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="google-play-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <img
          src="https://play.google.com/intl/en_us/badges/static/images/badges/fr_badge_web_generic.png"
          alt="Disponible sur Google Play"
          className="google-play-badge"
        />
      </motion.a>
      <p className="download-note">
        Téléchargez l'application dès maintenant sur Google Play !
      </p>
    </motion.div>
  );
};

export default EmailForm;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './EmailForm.css';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwprbapq';

const EmailForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="email-form"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="success-message">Merci ! Nous vous recontactons très vite.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      className="email-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p className="inline-warning">Utilisez l'adresse liée à votre compte Android (Google Play).</p>
      <input type="hidden" name="subject" value="I want to join the beta" />
      <div className="form-group">
        <input
          type="email"
          name="email"
          className="input"
          placeholder="Adresse email de votre compte Android"
          required
          disabled={isLoading}
        />
      </div>

      <motion.button
        type="submit"
        className="btn btn-primary"
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {isLoading ? 'Envoi…' : 'Envoyer'}
      </motion.button>
    </motion.form>
  );
};

export default EmailForm;

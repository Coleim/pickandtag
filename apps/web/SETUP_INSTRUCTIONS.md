# Instructions de Configuration

## 📋 Tâches terminées

✅ **Fonctionnalités "bientôt"** - Ajout des badges "Bientôt" aux fonctionnalités Objectifs, Communauté, Badges
✅ **Remplacement du mockup** - Le phone-mockup a été remplacé par une image (`/app-mockup.png`)
✅ **Section Contact** - Formulaire de contact avec Formspree (gratuit)
✅ **Logo Tritou** - Remplacement des emojis par l'image `tritou-appicon.png`
✅ **Bouton bêta** - Correction du formulaire d'inscription bêta
✅ **Pages légales** - Création des pages Confidentialité, Conditions, Cookies

## 🔧 Configuration requise

### 1. Images à ajouter
Placez ces images dans le dossier `public/` :
- `tritou-appicon.png` - Icône de l'application Tritou
- `app-mockup.png` - Mockup de l'application

### 2. Configuration Formspree

#### Pour le formulaire de contact :
1. Allez sur [formspree.io](https://formspree.io)
2. Créez un compte gratuit
3. Créez un nouveau formulaire
4. Remplacez `YOUR_FORM_ID` dans `src/components/Contact.js` ligne 39

#### Pour le formulaire bêta :
1. Créez un second formulaire sur Formspree
2. Remplacez `YOUR_BETA_FORM_ID` dans `src/components/EmailForm.js` ligne 39

### 3. Installation des dépendances
```bash
npm install
```

### 4. Lancement du projet
```bash
npm start
```

## 📁 Structure des fichiers

```
src/
├── components/
│   ├── Header.js & .css
│   ├── Hero.js & .css
│   ├── EmailForm.js & .css
│   ├── HowItWorks.js & .css
│   ├── Leaderboard.js & .css
│   ├── Contact.js & .css
│   └── Footer.js & .css
├── pages/
│   ├── Privacy.js
│   ├── Terms.js
│   ├── Cookies.js
│   └── LegalPages.css
├── App.js
├── index.js
└── index.css
```

## 🎨 Personnalisation

### Couleurs
Modifiez les variables CSS dans `src/index.css` :
```css
:root {
  --primary: #88c76e;
  --accent: #4CAF50;
  /* ... autres couleurs */
}
```

### Textes
- Modifiez directement dans les composants
- Les pages légales sont dans `src/pages/`

### Images
- Logo : `public/tritou-appicon.png`
- Mockup : `public/app-mockup.png`
- Favicon : `public/favicon.ico`

## 🚀 Déploiement

### Netlify
1. `npm run build`
2. Déployez le dossier `build/`

### Vercel
1. Connectez votre repo GitHub
2. Vercel détectera automatiquement React

### GitHub Pages
1. `npm run build`
2. Déployez le contenu de `build/` sur votre repo GitHub Pages

## 📧 Configuration email

### Formspree (recommandé - gratuit)
- 50 soumissions/mois gratuitement
- Interface simple
- Pas de backend requis

### Alternatives
- Netlify Forms (si déployé sur Netlify)
- EmailJS (gratuit jusqu'à 200 emails/mois)
- Getform (gratuit jusqu'à 50 soumissions/mois)

## 🔍 SEO

Le projet inclut :
- Meta tags optimisés
- Structure sémantique HTML5
- Open Graph et Twitter Cards
- Sitemap (à ajouter si nécessaire)

## 📱 Responsive

Le design est entièrement responsive :
- Mobile-first approach
- Breakpoints : 480px, 768px, 1024px
- Images adaptatives
- Navigation mobile optimisée

## 🎯 Fonctionnalités

### Formulaire bêta
- Validation email
- Sélection plateforme (Android/iOS)
- Message d'erreur si iOS sélectionné
- Animation de chargement
- Confirmation d'envoi

### Formulaire contact
- Champs : nom, email, sujet, message
- Validation côté client
- Gestion d'erreurs
- Message de succès

### Pages légales
- Politique de confidentialité (RGPD)
- Conditions d'utilisation
- Politique des cookies
- Navigation entre pages

## 🐛 Dépannage

### Images ne s'affichent pas
- Vérifiez que les images sont dans `public/`
- Vérifiez les noms de fichiers (sensible à la casse)

### Formulaires ne fonctionnent pas
- Vérifiez les IDs Formspree
- Vérifiez la console pour les erreurs
- Testez avec un formulaire simple

### Styles cassés
- Vérifiez que tous les fichiers CSS sont importés
- Vérifiez les variables CSS dans `index.css`

## 📞 Support

Pour toute question ou problème, contactez l'équipe de développement.

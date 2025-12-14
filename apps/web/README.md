# Pick and Tag - Landing Page

Une landing page moderne et responsive pour l'application "Pick and Tag", une application de collecte de déchets gamifiée.

## 🚀 Fonctionnalités

- **Design moderne et responsive** avec animations fluides
- **Collecte d'emails** pour la bêta Android avec validation
- **Sections informatives** expliquant le concept de l'application
- **Optimisation SEO** complète
- **Animations** avec Framer Motion
- **Système de couleurs** cohérent et accessible

## 🎨 Design

### Palette de couleurs
- **Primary**: `#88c76e` (Vert doux principal)
- **Accent**: `#4CAF50` (Vert plus saturé)
- **Secondary**: `#37474F` (Gris anthracite)
- **Background**: `#FAFAFA` (Fond clair)
- **Text**: `#263238` (Gris foncé)

### Sections
1. **Header** - Navigation avec logo animé
2. **Hero** - Titre principal avec formulaire d'inscription
3. **Comment ça marche** - 3 étapes du processus
4. **Leaderboard** - Section placeholder pour le futur
5. **Footer** - Liens et informations légales

## 🛠️ Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd pick-and-tag-landing
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm start
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 📱 Fonctionnalités de la bêta

- **Validation d'email** avec regex
- **Sélection de plateforme** (Android/iOS)
- **Message d'erreur** si iOS sélectionné
- **Animation de chargement** lors de la soumission
- **Message de confirmation** après inscription

## 🎯 SEO

- Meta tags optimisés pour les réseaux sociaux
- Structure sémantique HTML5
- Images optimisées avec alt text
- Schema.org markup (à ajouter si nécessaire)

## 📦 Scripts disponibles

- `npm run start` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run test` - Lance les tests

## 🌐 Déploiement

Pour déployer sur Netlify, Vercel ou GitHub Pages :

1. **Build de production**
   ```bash
   npm run build
   ```

2. **Déployer le dossier `build/`**

## 📝 Personnalisation

### Couleurs
Modifiez les variables CSS dans `src/index.css` :
```css
:root {
  --primary: #88c76e;
  --accent: #4CAF50;
  /* ... autres couleurs */
}
```

### Contenu
- **Textes** : Modifiez directement dans les composants
- **Images** : Ajoutez vos images dans `public/`
- **Animations** : Ajustez les paramètres Framer Motion

## 🔧 Intégration API

Pour connecter le formulaire à une vraie API :

1. **Modifiez `src/components/EmailForm.js`**
2. **Remplacez la simulation par un vrai appel API**
3. **Ajoutez la gestion d'erreurs**

Exemple :
```javascript
const response = await fetch('/api/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, platform })
});
```

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Soumettre des pull requests

## 📞 Contact

Pour toute question concernant ce projet, contactez l'équipe Pick and Tag.

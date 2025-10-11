### Bugs


- [X] Fixer le scroll
- [ ] Derniere collectes vides => Afficher "Pas de dechets cette semaine"


### Profile

- [ ] Display Name : Si not auth - Generer un nom de joueur aleatoirement et l'afficher
- [ ] Rajouter le device ID pour identification
- [ ] UUID si auth 
- [ ] isauth column



### **Phase 1.1 – MVP + Collecte Groupée**

🎯 Objectif : rendre l’app **utile, sociale, et engageante dès le départ**

- [ ]  🔑 Création de compte **optionnelle** (account-agnostic)
- [ ]  Gestion du profil (display name, uuid, mail, sauver en base ? )
- [ ]  🔑 **Créer une collecte groupée** → **nécessite un compte** (organisateur, gestion des événements, stats et badges)
- [ ]  ✅ **Participer à une collecte groupée** → **account-agnostic** (pas besoin de compte pour rejoindre et taguer)
- [ ]  **Collecte groupée** (événements locaux, participation visible)
- [ ]  🔑 Synchro online si compte créé (offline-first)
- [ ]  🔑 Partage social simple
- [ ]  ⭐ **XP & Levels** : si compte créé, gain d’XP et titres associés
- [ ]  Extraire langage (fr)

### **Phase 2 – Engagement**

🎯 Objectif : motiver la rétention et la progression

- Collecte groupée avec compte ⇒
- ⭐ Badges liés aux niveaux et aux actions
- ⭐ Notifications légères (level up, badges)
- ⭐ Voir les trash par **location simple** (liste + stats par ville/région)

### **Phase 3 – Expansion**

🎯 Objectif : challenge collectif & communauté

- 🌍 Leaderboard online (joueurs, équipes, villes) → level + XP visible
- 🌍 Local leaderboard (voir le top X + ton classement)
- 🌍 Trash Maps (heatmap / clusters / filtres par catégorie)
- 🌍 Multi-langues (FR/EN)
- 🌍 Éco-messages / fun facts → parfois avec XP bonus

### **Phase 4 – Différenciation / Viralité**

🎯 Objectif : rendre l’app **unique et mémorable**

- 🐾 Mascotte Tamagotchi Game → XP débloque interactions / évolutions
    - achat de costumes / accessoires
- 🐾 Partenariats (écoles, ONG, collectivités, entreprises) → défis sponsorisés avec XP/badges
- 🐾 Optional : Merch / shop virtuel lié à XP ou niveaux
- ⭐ Streaks / Events quotidiens → XP bonus




#### 

### Collecte groupees

Creer une collecte

Terminer une collecte

Recuperer les stats d’une collecte terminee

Rejoindre une collecte

Ajouter un trash a une collecte

Quitter la collecte

- If user **has not joined any collect** → any trash they add is **individual**.
- If user **has joined a collect** → all trash automatically goes to that collect.
    - Show a small **banner / toast / warning**:
        
        > “You are currently collecting for Park Clean-up. Trash will be added to this collect.”
        > 
    - Optional: allow **switching collect** in a dedicated page (not inline on Add Trash).

User clicks "Add Trash"
|
+-- Check currentCollectId in storage
|
+-- Exists → Add trash page
|     └─ Show notice: "You are collecting for [Collect Name]"
|     └─ All trash auto-linked to collect_id
|
+-- Does NOT exist → Add trash page
└─ collect_id = null (individual trash)

**//**TODO: **Picture/tag screen to be generated with the warning**

In Main Screen, show “Currently in collect: Park Clean-up (ends in 2h)”

//TODO: Screen to be generated


### CleanUp 

[ ] Componentiser
 [ ] Titles / Headers 
[ ] Pouvoir ajouter sans photos ( a voir )
[ ] Partage des stats

[ ] Faire code review par IA (claude + cursor)
[ ] Faire un readme correct

[ ] Publication sur Play Store
[ ] Beta Tests




## Features a developper

- XP / Levels
- Collectes groupees

- Share on social media 
- Gains de badges
- Series / Streaks 
- Multiplicateurs


- Carte avec les marqueurs

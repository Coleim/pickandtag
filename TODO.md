### Bugs

- [X] Derniere collectes vides => Afficher les N derniers
- [X] Voir dechet (photo)
- [X] Supprimer dechet (erreur)
- [X]  stocker l’url de l’image en base dans la nouvelle colonne + supprimer b64
- [x]  verifier que ca sauve bien les images
- [x]  Mise a jour de l’affichage en prenant l’image sur le disque
- [x]  Compresser les images a la collecte - https://chatgpt.com/c/68ea6135-d3d8-832b-a567-8bde298a731e
- [x]  Changer l’endroit ou on stocke les images
- [x] Dans le profil, laisser le placeholder pour les types de déchet meme si y'en a pas
- [x] Quand on stocke un dechet, le store se "remet a 0" avec juste ce dechet dans la liste
----------------------------------
- [ ] Monitorer les perfs de chaque query db
- [ ] Si dimanche on est pas nouvelle semaine.

- [ ] Charger les weekly list en differe avec un loader sur la liste ?? 
- [ ] Regarder le loader pourquoi il est long 
- [ ] Mettre la taille (plus ou moins de 2.5cm)
- [ ] Plus d'exp si plus gros
- [ ] Revoir l'exp avec la collecte d'aujourd'hui: 50 personnes. 12000
- [ ] rajouter une categorie cigarette.
- [ ] gps en direct pas lastknown loc. + afficher message d'erreur ( a la place de la loc) si pas trouve

### **Phase 1.1 – Compte et stats**

🎯 Objectif : rendre l’app **utile, sociale, et engageante dès le départ**

- [x]  Reorg par feature based
- [ ]  🔑 Création de compte (**optionnelle)** (account-agnostic)
    - [ ]  Faire joli la creation / connexion (via Google Only at the moment)
    - [ ]  comment “rester connecter” (ne pas se connecter a chaque launch de l’app)
- [ ]  🔑 Gestion du profil
    - [ ]  display name ?
- [ ]  🔑 Synchro online
- [ ]  Affichage de son profil / d’un profil en ligne (public)
- [ ]  🔑 Partage social simple (partage du lien du profil “web”)
- [ ]  Leaderboard simple
- [ ]  Web Page avec Stats simple ( a definir )
- [ ]  ⭐ Voir les trash par **location simple** (liste + stats par ville/région)
- [ ]  App Stats simple ( a definir )

### **Phase 2 – Collecte Groupée / Event**

- Creation d’events
- Recherche d’events
- 🔑 **Créer une collecte groupée** → **nécessite un compte** (organisateur, gestion des événements, stats et badges)
- [ ]  ✅ **Participer à une collecte groupée** → **account-agnostic** (pas besoin de compte pour rejoindre et taguer)
- [ ]  **Collecte groupée** (événements locaux, participation visible)



### Profile

- [ ] Display Name : Si not auth - Generer un nom de joueur aleatoirement et l'afficher
- [ ] Rajouter le device ID pour identification
- [ ] UUID si auth 
- [ ] isauth column

- [ ] Auth RLS a configurer


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
[ ] TouchableOpacity => Pressable

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

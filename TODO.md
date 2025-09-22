### Bugs


- [X] Fixer le scroll



### Profile

#### Jour 1

- [X] Mettre a jour le store
- [X] faire le chargement de tous les dechets
- [X] Afficher le nombre de dechets en Joli
- [ ] Rajouter la colonne "event_id"
- [ ] Injecter des fausses data hisrtorique
- [ ] Refaire les query pour plutot juste prendre les stats (plutot que tout) ⇒ sum


#### Jour 2 

- [ ]  filtrer par region ??
- [ ]  toujours sort les categories par nombre le plus grand (cf la requete sql)

#### Jour 3

- [ ] Generer un nom de joueur aleatoirement et l'afficher
- [ ] Rajouter le device ID pour identification


### Collecte groupees

Creer une collectt

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

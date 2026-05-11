# BEER/ME

--- 

## 1. <u>Vue d'ensemble du produit</u>

**Problème**

Les brasseurs, du homebrewer au professionnel artisanal, jonglent aujourd'hui entre plusieurs outils pour conduire un brassin: logiciel de création de recette, feuilles imprimées, tableau blanc ou veleda pour le suivi quotidien et tableau Excel pour le reporting. Cette fragmentation entraîne des pertes d'information, des erreurs de saisie et une difficulté à reproduire fidèlement une recette d'un brassin à l'autre.

**Vision**

BEER/ME remplace l'ensemble de ces outils par une application unique pour accompagner le brasseur de l'empatage jusqu'à la fin de la fermentation.

**Proposition de valeur unique**

Pour le brasseur artisanal, BEER/ME est la seule app conçue pour le suivi de brassin en conditions réelles, là où Excel demande de la discipline et le papier se perd, BEER/ME capture l'information au bon moment, sans friction.

**Objectif - MVP**

- Un brasseur peut ouvrir une recette existante et conduire un brassin complet depuis l'application
- Il peut suivre les étapes en temps réel, annoter les événements et modifier les métriques de la recette pendant le brassage
- Les données saisies sont conservées et associées au brassin

**Objectif - V1**
 
- Un brasseur peut saisir ses relevés de fermentation (densité, température) et visualiser leur évolution
- Il peut comparer les données réelles avec les attentes de la recette

---
## 2. <u>Utilisateur cibles</u>

- **Persona Principale - Le brasseur opérationnel**

**Profil**: Brasseur en brasserie artisanale, équipe de 2 à 3 personnes. Environ 4 brassins/semaine. Travaille dans un environnement physique contraignant (hangar de 500m2, humide, chaud en été froid en hiver). A l'aise aves les outils numériques, habitué aux logiciels de recettes (BeerSmith, BrewFather... ) et à Excel.

**Pain point principal**: La traçabilité au quotidien ressentie comme une corvée. Oubli ou flemme d'imprimer, mauvaise version de recette utilisée, oubli de renseigner les événements pendant le brassin. Résultat: données incomplètes, reproductibilité aléatoire, frustration.

**Ce qu'il attend**: Une app simple, rapide à prendre en main, utilisable les mains dans le cambouis qui capture l'info au bon moment et sans friction.

- **Persona Secondaire - Le homebrewer passionné**

**Profil**: Brasseur amateur, brasse seul à domicile, 1 à 2 brassins/mois. Très à l'aise techniquement, souvent déjà utilisateur de logiciels de recettes (Brewers Friend, Little Bock, BeerSmith...).

**Pain point principal**: Suivi de fermentation imprécis, notes dispersées, difficulté à analyser et améliorer ses brassins dans le temps.

**Ce qu'il attend**: Un outil simple pour centraliser ses données sans avoir à maintenir un Excel.

- **Persona Bonus - Le head brewer (piste V2)**

**Profil**: Responsable de production, il a une vision d'ensemble sur les brassins, les stocks et les coûts.

**Pain Point principal**: Retracer les données de production (ingrédients utilisés, densités relevées, taux d'alcool) oblige à fouiller dans un classeur de +100 pages. Chronophage, source d'erreurs, et ça ralentit les décisions :réapprovisionnement, analyse de qualité, déclarations.

**Ce qu'il attend**: Un historique structuré et consultable rapidement, sans reconstituer l'info à la main.

**Pourquoi V2**: Ces besoins impliquent des vues agrégées et une gestion de production qui sortent du cadre de BEER/ME v1.

---

## 3. <u>Périmètre fonctionnel</u>

**MVP - Mode Brassin**
  - Import d'une recette depuis un fichier BeerXML (format standard, compatible BeerSmith)
  - Suivi des étapes de brassage en temps réel avec gestion du timing
  - Annotation des événements en cours de brassin (prises de densité, incidents, observations)
  - Modification des métriques de la recette pendant le brassin — les modifications créent une version propre au brassin sans altérer la recette de référence
  - Passation de session entre utilisateurs en cours de brassin (mono-utilisateur à un instant T)

**V1 - Suivi de fermentation**

  - Saisie des relevés de fermentation (densité, température)
  - Visualisation de la courbe d'évolution générée automatiquement
  - Comparaison avec les valeurs cibles de la recette

**Hors Scope**

 - Création de recettes (BEER/ME importe, il ne crée pas)
 - Gestion des stocks
 - Édition simultanée par plusieurs utilisateurs
 - Calcul de coûts de production
 - Déclarations douanières

 ---

 ## 4. <u>User stories</u>

### MVP

**US-001 - Import de recette**
> "En tant que brasseur opérationnel, je veux importer une recette depuis un fichier BeerXML afin de démarrer un brassin sans ressaisir de données manuellement"

**Critères d'acceptance**:
- le fichier BeerXML est parsé et les données de la recette sont affichées correctement
- Une recette importée ne peut pas être modifiée directement (seule la version brassin est éditable)

**US-002 - Démarrage d'un brassin**
> "En tant que brasseur opérationnel, je veux créer un nouveau brassin à partir d'une recette importer afin de démarrer le suivi en temps réel"

**Critères d'acceptance**:
- Le brassin est horodaté automatiquement au démarrage
- Une copie de la recette est créée et associée à ce brassin

**US-003 - Suivi des étapes**

> "En tant que brasseur opérationnel, je veux suivre les étapes de ma recette en temps réel afin de ne pas perdre le fil de ma journée de brassage"

**Critères d'acceptance**:
- Les étapes s'affichent dans l'ordre de la recette avec leur durée attendue
- Le brasseur peut marquer une étape comme terminée

**US-004 - Annotation d'un évènement**

> "En tant que brasseur opérationnel, je veux annoter un évènement en cours de brassin afin de garder une trace des incidents ou observations" 

**Critères d'acceptance**:
- L'annotation est horodatée automatiquement
- Elle est associée à l'étape en cours au moment de la saisie

**US-005 - Modification d'une métrique**

> "En tant que brasseur opérationnel, je veux modifier une métrique de la recette en cours de brassin afin d'adapter la recette aux conditions réelles sans altérer la recette de référence"

**Critères d'acceptance**:
- La modification est enregistrée dans la version brassin uniquement
- La recette originale reste inchangée

**US-006 - Passation de session**

> "En tant que brasseur opérationnel, je veux passer la main à un collègue en cours de brassin afin d'assurer la continuité du suivi sans interruption."

**Critères d'acceptance**:
- Un seul utilisateur est actif sur un brassin à un instant T
- Le collègue qui prend la main voit l'état courant du brassin sans perte de données

### V1

**US-007 - Saisie d'un relevé de fermentation**

> "En tant que brasseur opérationnel, je veux saisir un relevé de densité et de température afin de suivre l'évolution de ma fermentation"

**Critères d'acceptance**:
- Le relevé est horodaté automatiquement
- Il est associé au brassin en cours

**US-008 - Visualisation de la courbe de fermentation**

> "En tant que brasseur opérationnel, je veux visualiser la courbe d'évolution de ma fermentation afin d'évaluer si elle se déroule normalement" 

**Critères d'acceptance**:
- La courbe affiche densité et température en fonction du temps
- Les valeurs cibles de la recette sont affichées en superposition

--- 

## 5. <u>Exigences non-fonctionnelles</u>

**Disponibilité offline**

L'application fonctionne sans connexion internet. Les données saisies pendant un brassin sont stockées localement et synchronisées avec le serveur dès que le réseau est disponible. Implémenté via PWA (service worker + cache local).

**Compatibilité et responsive**

Priorité mobile, puis tablette, puis desktop. L'interface s'adapte à chaque format sans perte de fonctionnalité.

**Performance**

- Chargement initial de l'app : < 3s sur réseau 4G
- Chargement d'une recette : < 2s
- Actions en cours de brassin : < 500ms

 ▎ Les seuils de performance s'appuient sur les Core Web Vitals (Google) : LCP < 2.5s, INP < 200ms. Le chargement initial de l'app est fixé à < 3s sur réseau 4G comme objectif projet.

**Accessibilité contextuelle**

Zones de tap larges (utilisable avec des gants), contrastes élevés, lisibilité en environnement lumineux variable. L'app doit être utilisable sans précision tactile fine.

**Eco-conception**

L'app est conçue dans une démarche d'éco-conception : requêtes minimisées, assets optimisés, pas de données chargées inutilement. Ce point fera l'objet d'une réflexion approfondie en phase de conception technique.

--- 

## 6. <u>Stack technique</u>

| Couche | Choix | Justification |
|---|---|---|
| Frontend | React + TypeScript | Stack maîtrisée, écosystème riche, logique composant transposable vers React Native en V2 |
| PWA | Vite PWA plugin | Simplifie la configuration du service worker et la gestion du cache offline |
| Styling | Tailwind | Rapidité de prototypage, cohérence du design system sur projet solo |
| Backend | Node.js + Express | Cohérence full-JS avec le frontend, stack maîtrisée |
| Base de données | PostgreSQL | Données structurées et relationnelles, robustesse pour les données de production |
| Auth | JWT | Standard léger adapté à une API REST |
| Dataviz | Recharts | Bibliothèque React native, suffisante pour les courbes de fermentation |

▎ Un BaaS (ex. Supabase) a été envisagé pour simplifier le backend. Cette option a été écartée dans le cadre du projet d'étude afin de démontrer la maîtrise complète de la stack : modélisation de base de données, API REST, et gestion de l'authentification. 

--- 

## 7. <u>Métriques de succès</u>

- Un brassin complet peut être conduit sans quitter l'application ni recourir à un outil externe
- A n'importe quel moment après un brassin un brasseur peut consulter l'historique, identifier les écarts entre la version brassin et la recette de référence et en tirer des décisions d'amélioration
- Aucune donnée saisie en mode offline n'est perdue lors de la resynchronisation

---

## 8. <u>Hypothèses et risques</u>

**Hypothèses**
   - Les brasseurs artisanaux ont un smartphone ou une tablette à portée pendant le brassin
   - Le format BeerXML est suffisamment répandu pour couvrir la majorité des recettes existantes
   - La friction lié à l'outil actuel est assez forte pour motiver un changement d'habitude

**Risques**
  - Adoption: changer les habitudes d'un brasseur qui à un système en place et "fait comme ça depuis longtemps" est difficile
  - Offline: la synchronisation post-déconnexion peut générer des conflits de données
  - BeerXML: certaines recettes maison ne sont pas renseignées dans un logiciel, l'import est impossible
  - Contrainte matérielle: une app utilisée en continu pendant 6 à 8h de brassin peut drainer la batterie d'un mobile. L'accès à une prise n'est pas garanti.
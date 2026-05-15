# Architecture - BEER/ME

## Patron de conception

BEER/ME adopte une **architecture multicouche classique** côté backend :

```
Client (React PWA)
       ↓ HTTPS
    Nginx (reverse proxy)
       ↓ HTTP
  Routes → Controllers → Services → Repositories
                                         ↓
                                    PostgreSQL
```

Ce choix est délibéré et proportionné à la complexité du domaine. BEER/ME est une application à logique métier structurée mais sans complexité extrême : gestion de brassins, suivi d'étapes, annotations, import BeerXML. Une architecture hexagonale ou clean architecture apporterait une couche d'abstraction injustifiée pour ce périmètre. Le pattern multicouche offre une séparation des responsabilités claire, facile à maintenir et à faire évoluer.

---

## Rôle de chaque couche backend

### Présentation - Routes & Controllers
Les routes Express définissent les endpoints de l'API REST. Les controllers reçoivent les requêtes HTTP, délèguent le traitement aux services et renvoient la réponse. Ils ne contiennent aucune logique métier.

### Métier - Services
Les services portent la logique applicative : création d'un brassin depuis une recette, application des modifications de métriques sans toucher à la recette originale, gestion de la passation de session. C'est la couche centrale, indépendante du protocole HTTP.

### Accès données - Repositories
Les repositories encapsulent toutes les interactions avec la base de données via Prisma. Les services n'appellent jamais Prisma directement, ils passent par les repositories. Cette isolation simplifie les tests et limite l'impact d'un changement d'ORM.

### Données - PostgreSQL
Base de données relationnelle. Les migrations sont gérées par Prisma Migrate depuis le fichier `schema.prisma`, qui fait office de source de vérité pour le schéma.

---

## Sécurité

### Validation des entrées
Toutes les données entrantes (corps de requête, paramètres, fichiers BeerXML) sont validées côté backend avant tout traitement, à l'entrée du controller. Aucune donnée non validée ne descend dans les services. La bibliothèque Zod est utilisée pour définir les schémas de validation et générer des messages d'erreur explicites.

### Authentification
L'authentification repose sur des **JWT (JSON Web Tokens)**. Le token est signé avec une clé secrète stockée en variable d'environnement, jamais en dur dans le code. Il est transmis via le header `Authorization: Bearer <token>`. Un middleware dédié vérifie et décode le token sur chaque route protégée avant que la requête n'atteigne le controller.

Les tokens ont une durée de vie courte (ex. 1h). Un mécanisme de refresh token est prévu pour éviter les déconnexions intempestives en contexte de brassage.

### Stockage des secrets
Aucun secret (clé JWT, URL de base de données, variables d'API) n'est présent dans le code source. Tout est géré via des variables d'environnement (fichier `.env`, exclu du dépôt via `.gitignore`). En production, les secrets sont injectés via les variables d'environnement du serveur.

### Cloisonnement des permissions
Chaque utilisateur n'accède qu'à ses propres données. Les requêtes aux repositories filtrent systématiquement par `userId` issu du token JWT, indépendamment des paramètres fournis par le client. Un utilisateur ne peut pas accéder aux brassins d'un autre, même en forgeant un identifiant dans l'URL.

La passation de session (US-006) est gérée applicativement : un seul utilisateur actif par brassin à un instant T, vérifié côté service avant toute écriture.

Ces principes sont conformes aux recommandations ANSSI en matière de contrôle d'accès, validation des entrées et gestion des secrets.

---

## Sobriété numérique

### Pagination par défaut
Toutes les listes (brassins, recettes, annotations, relevés de fermentation) sont paginées côté API. Aucun endpoint ne renvoie une collection complète sans limite explicite.

### Payloads limités
Les réponses API ne renvoient que les champs nécessaires à l'usage client concerné. Les données volumineuses (ex. contenu complet d'une recette BeerXML parsée) ne sont chargées qu'à la demande, pas dans les listes.

### Pas de polling
L'application ne rafraîchit pas les données en boucle. Les mises à jour d'état (étapes, annotations) sont déclenchées par des actions utilisateur explicites. En mode hors-ligne (PWA), les données sont lues depuis le cache local.

### Cache
Les données statiques ou peu changeantes (recettes importées, étapes d'une recette) sont mises en cache côté client via le service worker de la PWA. Les requêtes API inutiles sont ainsi évitées lors des rechargements.

Ces choix s'inscrivent dans les principes d'éco-conception logicielle : réduire les transferts de données inutiles, éviter les traitements superflus côté serveur et client.

---

## Stack technique

| Composant | Choix | Justification |
|---|---|---|
| Langage (front + back) | TypeScript | Typage statique, détection d'erreurs à la compilation, cohérence full-stack |
| Framework frontend | React + Vite | Écosystème mature, PWA via `vite-plugin-pwa` |
| Styling | Tailwind CSS | Utilitaire, pas de CSS mort en production |
| Framework backend | Node.js + Express | Léger, bien adapté à une API REST, maîtrisé |
| ORM | Prisma | TypeScript-first, types générés automatiquement depuis le schéma, migrations simples |
| Base de données | PostgreSQL | Relationnel robuste, adapté aux données structurées du brassage |
| Authentification | JWT | Stateless, adapté à une API REST découplée |
| Reverse proxy | Nginx | Terminaison SSL, service des fichiers statiques, séparation front/back |

---

## Découplage front / back

Le frontend (React PWA) et le backend (API REST Express) sont **strictement découplés**. Ils ne partagent aucun code d'infrastructure et communiquent exclusivement via HTTP/JSON.

Le frontend est déployé comme un ensemble de fichiers statiques servis par Nginx. Le backend expose une API REST versionnée (`/api/v1/...`). Cette séparation permet de faire évoluer chaque partie indépendamment et constitue une contrainte non négociable du projet.

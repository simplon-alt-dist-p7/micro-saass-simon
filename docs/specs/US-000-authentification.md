# US-000 — Authentification

**User Story**
> "En tant qu'utilisateur de BEER/ME, je veux créer un compte et me connecter de façon sécurisée afin que mes recettes et mes brassins restent privés et protégés"

**Critères d'acceptance**

### Scénario 1 : Inscription réussie
**Given** un visiteur sans compte
**When** il s'inscrit avec un email non utilisé et un mot de passe d'au moins 8 caractères
**Then** un compte est créé
**And** une session est démarrée immédiatement, sans étape de connexion séparée

### Scénario 2 : Inscription avec email déjà utilisé
**Given** un visiteur tente de s'inscrire
**When** l'email fourni correspond à un compte existant
**Then** l'inscription est refusée avec un message explicite
**And** aucun compte n'est créé

### Scénario 3 : Inscription avec mot de passe trop court
**Given** un visiteur tente de s'inscrire
**When** le mot de passe fourni fait moins de 8 caractères
**Then** l'inscription est refusée avec un message explicite
**And** aucun compte n'est créé

### Scénario 4 : Connexion réussie
**Given** un utilisateur inscrit
**When** il se connecte avec le bon email et le bon mot de passe
**Then** une session est démarrée
**And** il accède à ses propres données

### Scénario 5 : Connexion avec identifiants invalides
**Given** un utilisateur tente de se connecter
**When** l'email ne correspond à aucun compte, ou le mot de passe est incorrect
**Then** un message d'erreur générique est affiché
**And** ce message ne révèle pas si l'email est enregistré ou non

### Scénario 6 : Renouvellement silencieux de la session
**Given** un utilisateur connecté dont l'access token a expiré
**When** il effectue une action dans l'application en étant en ligne
**Then** l'access token est renouvelé automatiquement et silencieusement
**And** l'utilisateur n'est pas invité à se reconnecter

### Scénario 7 : Session réellement expirée
**Given** un utilisateur connecté dont le refresh token est invalide, expiré ou révoqué
**When** l'application tente de renouveler la session en étant en ligne
**Then** l'utilisateur est déconnecté
**And** redirigé vers l'écran de connexion avec un message explicite

### Scénario 8 : Déconnexion explicite
**Given** un utilisateur connecté
**When** il se déconnecte explicitement
**Then** sa session est invalidée côté serveur
**And** toute tentative ultérieure de réutiliser cette session échoue

### Scénario 9 : Continuité de session hors-ligne
**Given** un utilisateur connecté en plein brassin
**When** son appareil perd la connexion réseau
**Then** il n'est pas déconnecté faute de réseau
**And** ses actions continuent d'être mises en file selon le comportement offline existant

### Scénario 10 : Protection des routes existantes
**Given** une requête vers une route auparavant protégée par l'authentification temporaire
**When** elle ne porte pas d'access token valide
**Then** elle est rejetée, sans aucune donnée retournée
**And** pour une requête valide, les données renvoyées sont toujours filtrées par l'utilisateur du token, jamais par un paramètre client

**Notes de cadrage (2026-11-04)**
- Mot de passe minimum 8 caractères, pas de règle de complexité imposée.
- Access token 15 min ; refresh token 30 jours glissant (expiration prolongée à chaque utilisation).
- Un seul refresh token actif par utilisateur (hash stocké côté serveur) ; une nouvelle connexion invalide implicitement la session précédente.
- Cette US inclut le remplacement du middleware d'authentification temporaire (`fakeAuth`) sur les routes déjà livrées (brassins).
- Hors scope : mot de passe oublié, vérification d'email à l'inscription, 2FA, sessions multiples simultanées.

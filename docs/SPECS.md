# SPECS — BEER/ME

## US-001 — Importer une recette
  
>**En tant que** brasseur opérationnel, **je veux** importer une recette depuis un fichier BeerXML, **afin de** démarrer un brassin sans ressaisir les données manuellement.

### Scénario 1 : Import réussi
**Given** le brasseur dispose d'un fichier BeerXML valide exporté depuis BeerSmith
**When** il importe le fichier dans l'application
**Then** les données de la recette sont affichées correctement
**And** la recette est disponible pour démarrer un brassin
  
### Scénario 2 : Fichier invalide
**Given** le brasseur tente d'importer un fichier non conforme au format BeerXML
**When** l'import est lancé
**Then** l'application affiche un message d'erreur explicite
**And** aucune recette n'est créée

---

## US-002 - Démarrer un brassin

>**En tant que** brasseur opérationnel, **je veux** créer un nouveau brassin à partir d'une recette importer **afin de** démarrer le suivi en temps réel.

### Scénario 1 : 
**Given** le brasseur a importé une recette dans l'application
**When** il crée un nouveau brassin à partir de cette recette
**Then** un brassin est créé avec une copie de la recette
**And** le brassin est horodaté automatiquement au démarrage 

---

## US-003 - Suivre les étapes du brassage

>En tant que brasseur opérationnel, je veux suivre les étapes de ma recette en temps réel afin de ne pas perdre le fil de ma journée de brassage

### Scénario 1 : 

**Given** le brasseur a démarré un brassin
**When** il consulte les étapes de la recette
**Then** les étapes s'affichent dans l'ordre avec leur durée attendue
**And** le brasseur peut marquer une étape comme terminée

---

## US-004 - Annoter un événement

### Scénario 1 : 

**Given** le brasseur est en cours de brassin sur une étape active
**When** il saisit une annotation (prise de densité, incident, observation)
**Then** l'annotation est enregistrée avec un horodatage automatique
**And** elle est associée à l'étape en cours

---
## US-005 - Modifier une métrique en cours de brassage

### Scénario 1 : 

**Given** le brasseur est en cours de brassin
**When** il modifie une métrique de la recette
**Then** la modification est enregistrée dans la version brassin uniquement
**And** la recette originale reste inchangée

### Scénario 2 :

**Given** le brasseur a modifié des métriques pendant un brassin
**When** il consulte la recette originale
**Then** la recette originale affiche les valeurs d'origine
**And** aucune modification du brassin n'y apparaît

---

## US-006 - Passation de session :

### Scénario 1 : 

**Given** un brasseur est actif sur un brassin en cours
**When** il passe la main à un collègue
**Then** le collègue accède à l'état courant du brassin
**And** un seul utilisateur est actif à un instant T

---

## US-007 - Saisir un relevé de fermentation :

### Scénario 1 : 

**Given** le brassin est terminé et en phase de fermentation
**When** le brasseur saisit un relevé de densité et de température
**Then** le relevé est enregistré avec un horodatage automatique
**And** il est associé au brassin en cours

---

## US-008 - Visualiser les courbes de fermentation :

### Scénario 1 : 

**Given** le brasseur a saisi au moins deux relevés de fermentation
**When** il consulte le suivi de fermentation
**Then** une courbe d'évolution de densité et température est affichée
**And** les valeurs cibles de la recette sont visibles en superposition




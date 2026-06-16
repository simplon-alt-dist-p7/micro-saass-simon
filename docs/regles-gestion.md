# Règles de gestion — BEER/ME

Les règles de gestion définissent les contraintes métier qui gouvernent le comportement de l'application. Elles constituent la référence pour la modélisation des données, le développement de l'API et les validations côté frontend.

---

## RG-001 à RG-005 — Recette

| ID | Libellé | Source |
|---|---|---|
| RG-001 | Une recette ne peut être créée que par import d'un fichier BeerXML valide. La saisie manuelle d'une recette est hors périmètre. | PRD §3, US-001 |
| RG-002 | Une recette importée est en lecture seule. Elle ne peut pas être modifiée directement dans l'application. | US-001 |
| RG-003 | Un fichier BeerXML non conforme au format standard est rejeté. Aucune recette n'est créée et un message d'erreur est affiché. | US-001 — Scénario 2 |
| RG-004 | Une même recette peut servir de base à plusieurs brassins distincts. | PRD §3 |
| RG-005 | Une recette est identifiée de manière unique dans l'application. | Modélisation |

---

## RG-006 à RG-012 — Brassin

| ID | Libellé | Source |
|---|---|---|
| RG-006 | Un brassin ne peut être créé qu'à partir d'une recette existante dans l'application. | US-002 |
| RG-007 | À la création d'un brassin, une copie de la recette est créée et associée à ce brassin. Cette copie constitue la « version brassin » de la recette. | US-002, US-005 |
| RG-008 | La date et l'heure de démarrage d'un brassin sont enregistrées automatiquement à sa création. | US-002 |
| RG-009 | La version brassin d'une recette est modifiable. La recette originale ne l'est pas. | US-005 |
| RG-010 | Toute modification de métrique effectuée pendant un brassin s'applique exclusivement à la version brassin. La recette originale reste inchangée. | US-005 |
| RG-011 | Un brassin ne peut être actif que pour un seul utilisateur à un instant T. | US-006 |
| RG-012 | Un brassin est associé à l'utilisateur qui l'a démarré. En cas de passation, le brassin est réassocié à l'utilisateur qui reprend la main. | US-006 |

---

## RG-013 à RG-015 — Étapes

| ID | Libellé | Source |
|---|---|---|
| RG-013 | Les étapes d'un brassin sont affichées dans l'ordre défini par la recette. | US-003 |
| RG-014 | Chaque étape porte une durée attendue issue de la recette. | US-003 |
| RG-015 | Une étape peut être marquée comme terminée par le brasseur actif. | US-003 |

---

## RG-016 à RG-018 — Annotations et événements

| ID | Libellé | Source |
|---|---|---|
| RG-016 | Une annotation est horodatée automatiquement à sa création. | US-004 |
| RG-017 | Une annotation est associée à l'étape active au moment de sa saisie. | US-004 |
| RG-018 | Seul l'utilisateur actif sur le brassin peut créer une annotation. | US-004, US-006 |

---

## RG-019 à RG-021 — Passation de session

| ID | Libellé | Source |
|---|---|---|
| RG-019 | Un seul utilisateur est actif sur un brassin à un instant T. | US-006 |
| RG-020 | L'utilisateur qui reprend la main voit l'état courant du brassin sans perte de données. | US-006 |
| RG-021 | La passation de session est initiée par l'utilisateur actif ou par l'administrateur. Elle ne peut pas être prise unilatéralement. | US-006 |

---

## RG-022 à RG-025 — Fermentation (V1)

| ID | Libellé | Source |
|---|---|---|
| RG-022 | Un relevé de fermentation contient obligatoirement une valeur de densité et une valeur de température. | US-007 |
| RG-023 | Un relevé de fermentation est horodaté automatiquement à sa création. | US-007 |
| RG-024 | Un relevé de fermentation est associé à un brassin existant. | US-007 |
| RG-025 | La courbe de fermentation est affichée à partir de deux relevés minimum. En dessous de ce seuil, aucune courbe n'est tracée. | US-008 |

---

## RG-026 à RG-027 — Offline et synchronisation

| ID | Libellé | Source |
|---|---|---|
| RG-026 | Toutes les données saisies en mode offline sont stockées localement et synchronisées avec le serveur dès que la connexion est rétablie. | PRD §5 |
| RG-027 | Aucune donnée saisie en mode offline ne peut être perdue lors de la resynchronisation. | PRD §7 — Métriques de succès |

# Guide de contribution - support informatique

## 1. Organisation Git

- `main` : version stable à livrer.
- `develop` : branche commune d'intégration.
- `feat/nom-fonctionnalite` : branche de développement d'une fonctionnalité.
- `fix/nom-correction` : branche dédiée à une correction.
- `test/nom-test` : branche dédiée à des tests si nécessaire.
- `docs/nom-documentation` : branche dédiée à la documentation si nécessaire.

Chaque branche de fonctionnalité est créée depuis `develop`.

Les modifications sont intégrées par Pull Request après relecture par un autre membre. Aucun push direct sur `main`.

## 2. Conventions de nommage

- Fichiers TypeScript : `kebab-case`, par exemple `ticket-rules.ts`.
- Composants Angular : noms descriptifs en `kebab-case`, par exemple `ticket-detail`.
- Interfaces et types : `PascalCase`, par exemple `Ticket`, `Comment`, `TicketStatus`.
- Fonctions et variables : `camelCase`, par exemple `nextStatuses`, `createdAt`.
- Constantes : `UPPER_SNAKE_CASE`, par exemple `PRIORITY_ORDER`.

## 3. Conventions de code

- Utiliser TypeScript avec des types explicites.
- Éviter `any`.
- Centraliser les appels HTTP dans le service API.
- Isoler les règles métier dans des fonctions pures et testables.
- Garder les composants responsables de l'affichage et des interactions.
- Respecter l'accessibilité et l'affichage mobile.

## 4. Conventions de commits

Utiliser les préfixes conventionnels :

- `feat:` ajout d'une fonctionnalité.
- `fix:` correction d'un problème.
- `test:` ajout ou modification de tests.
- `refactor:` réorganisation du code sans changement fonctionnel.
- `docs:` documentation.
- `style:` changements de mise en forme sans modification de logique.

Exemples :

- `feat: ajouter les règles métier des tickets`
- `test: tester les transitions de statut`
- `docs: documenter les conventions de contribution`

## 5. Avant chaque Pull Request

- Vérifier que le projet compile.
- Exécuter le lint.
- Exécuter les tests.
- Relire les changements.
- Décrire les modifications et les tests effectués dans la Pull Request.

## 6. Travail en équipe

- Chaque membre est responsable d'au moins une fonctionnalité, de sa branche jusqu'à sa fusion.
- Se mettre d'accord sur les modèles `Ticket` et `Comment` et sur les signatures du service API avant de développer les fonctionnalités qui en dépendent.
- Éviter de modifier les fichiers attribués à un autre membre sans coordination.
- Communiquer rapidement sur les dépendances et les conflits.
- À la livraison, intégrer tout le travail validé dans `main` et mettre à jour le `README.md`.

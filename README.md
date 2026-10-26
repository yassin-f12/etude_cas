# Étude de cas : une application Angular en équipe

**Séance 12, jour 6 après-midi (14h00-17h00), en groupe de 3 ou 4.**

Vous avez construit TechCorp RH pas à pas pendant cinq jours. Cet après-midi, vous changez de sujet et vous travaillez en équipe : il faut décider, se répartir le travail, intégrer le code des autres et livrer une application qui fonctionne à 16h00. C'est ce travail qui sert de validation du module.

## Les trois sujets

Chaque groupe choisit un sujet. Les trois ont la même structure et la même difficulté : deux ressources liées, une liste, un détail, un formulaire et une règle métier.

| Sujet | Ressources | Règle métier principale |
|---|---|---|
| [1. Réservation de salles](sujet-1-reservation-salles.md) | salles, réservations | deux réservations d'une même salle ne se chevauchent pas |
| [2. Prêt de matériel](sujet-2-pret-materiel.md) | matériels, prêts | un matériel prêté ou en maintenance n'est pas disponible ; repérer les retards |
| [3. Support informatique](sujet-3-support-informatique.md) | tickets, commentaires | un ticket suit un cycle de statuts imposé |

Contexte commun : le **Campus Numérique de Lyon**, un centre de formation fictif.

## Déroulé de l'après-midi

| Heure | Étape |
|---|---|
| 14h00 | Groupes, choix du sujet, lecture de l'énoncé et de la [grille d'évaluation](grille-evaluation.md) |
| 14h15 | Mise en place : dépôt, projet Angular, API fictive, répartition des tâches |
| 14h35 | Développement |
| 15h15 | Point d'étape : la liste (F1) s'affiche avec les données de l'API |
| 16h00 | Gel du code : tout est fusionné sur `main`, README à jour |
| 16h15 | Démonstrations, 5 minutes par groupe, puis 2 minutes de questions |
| 16h55 | Clôture du module |

## Mise en place (20 minutes, une seule personne au clavier)

1. Créer le dépôt GitHub du groupe et inviter les membres et le formateur.
2. Créer le projet : `npx @angular/cli@22 new <nom> --style=css --ssr=false --defaults`, puis `ng add angular-eslint`.
3. Copier le design system du starter (`starter/techcorp-rh/src/styles/` et `src/styles.css`), puis changer les couleurs dans `theme.css`.
4. Copier l'API fictive (`etude-de-cas/api-mock/`) dans le dépôt, ajouter `proxy.conf.json` et l'option `proxyConfig` de `ng serve` comme en séance 7.
5. Premier commit sur `main`, poussé. Les autres membres clonent le dépôt.

Pendant ce temps, les autres membres lisent l'énoncé et écrivent les tâches (issues GitHub ou liste dans le README) : une tâche par fonctionnalité.

## Règles de travail en équipe

- **Tout le monde code.** Chaque membre porte au moins une fonctionnalité, de la branche à la fusion.
- **Une branche par fonctionnalité** : `feat/liste-salles`, `feat/formulaire-pret`...
- **Pull request relue** par un autre membre avant fusion dans `main`. On ne pousse pas directement sur `main` après la mise en place.
- **Commits conventionnels** : `feat: ...`, `fix: ...`, `test: ...`, `docs: ...`.
- **Avant chaque fusion** : `npm run lint` et `npm test` passent.
- Commencez par se mettre d'accord sur les **modèles TypeScript** (`models/`) et le **service d'accès à l'API** : c'est ce que tout le monde utilise.

Rôles conseillés (en plus du code) : un **intégrateur** (dépôt, fusions, conflits), un **garant qualité** (lint, tests, accessibilité), un **référent démo** (scénario de démonstration, README).

## Niveaux

L'énoncé de chaque sujet est découpé en trois niveaux, comme les TP :

- **Socle** (attendu de tous les groupes) : F1 à F3.
- **Intermédiaire** : F4 à F6.
- **Avancé** : F7, tests de bout en bout, API NestJS en bonus.

Un groupe qui livre un socle propre, accessible et testé obtient une meilleure note qu'un groupe qui livre tout à moitié. Voir la grille.

## Livrables à 16h00

- Le dépôt GitHub, avec tout le travail fusionné sur `main`.
- Un `README.md` : sujet, membres et rôles, commandes de lancement, fonctionnalités livrées, limites connues.
- Une démonstration de 5 minutes (voir la grille).

## Démonstration (5 minutes)

1. Le sujet et l'équipe (30 secondes).
2. Un parcours utilisateur complet, sur l'application qui tourne (2 minutes 30).
3. Un extrait de code dont vous êtes fiers, et pourquoi (1 minute).
4. Ce qui ne marche pas encore, et ce que vous feriez ensuite (1 minute).

Tous les membres parlent au moins une fois.

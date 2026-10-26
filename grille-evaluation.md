# Grille d'évaluation de l'étude de cas

Note sur 20, commune au groupe, avec un ajustement individuel possible de plus ou moins 2 points (participation au code, visible dans l'historique Git et pendant la démonstration).

La grille est distribuée à 14h00 : chaque groupe sait dès le départ ce qui est évalué.

## Critères

| Critère | Points | Insuffisant | Attendu | Maîtrisé |
|---|---|---|---|---|
| 1. Fonctionnalités du socle (F1 à F3) | 6 | Une fonctionnalité manque ou ne marche pas avec l'API | Les trois fonctionnent avec l'API fictive | Les trois, avec états de chargement, d'erreur et liste vide |
| 2. Fonctionnalités intermédiaires et avancées (F4 à F7) | 3 | Aucune | Une ou deux | Trois ou plus |
| 3. Qualité du code Angular | 4 | Logique dans les templates, `any`, appels HTTP dans les composants | Composants découpés, service d'accès aux données, modèles typés, signals | Règle métier isolée dans une fonction testée, composants de présentation réutilisables |
| 4. Accessibilité, responsive, sémantique | 3 | Champs sans libellé, page inutilisable sur mobile | Libellés, erreurs annoncées, titres de page, affichage mobile correct | Navigation au clavier vérifiée, audit axe sans erreur |
| 5. Tests et outillage | 2 | Aucun test ajouté, lint en erreur | Lint sans erreur, tests de la règle métier | Tests de composant et un test Playwright |
| 6. Travail en équipe et Git | 2 | Tout sur `main`, un seul contributeur | Branches, pull requests relues, commits conventionnels, README | Tâches tracées, conflits résolus proprement, chacun a fusionné du code |

Total : 20 points.

## Barème indicatif par critère

- **Insuffisant** : 0 à 30 % des points du critère.
- **Attendu** : 50 à 70 %.
- **Maîtrisé** : 100 %.

## Démonstration

La démonstration n'a pas de points propres : elle sert à vérifier les critères 1 à 4 sur l'application qui tourne. Une fonctionnalité non montrée et non décrite dans le README n'est pas comptée.

## Lien avec le référentiel CDA

| Critère | Compétences |
|---|---|
| 1, 2 | CP2 Développer des interfaces utilisateur, CP3 Développer des composants métier |
| 3 | CP3, CP6 Définir l'architecture logicielle d'une application |
| 4 | CP2 (accessibilité, responsive) |
| 5 | CP9 Préparer et exécuter les plans de tests d'une application |
| 6 | CP4 Contribuer à la gestion d'un projet informatique |

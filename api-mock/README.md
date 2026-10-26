# Fausses API de l'étude de cas (séance 12)

Une API REST simulée avec json-server pour chacun des trois sujets. Même principe qu'en séance 7 : préfixe `/api`, port 3000, réponses ralenties de 300 ms pour voir les états de chargement.

```bash
npm install
npm run salles      # sujet 1 : réservation de salles
npm run materiel    # sujet 2 : prêt de matériel
npm run support     # sujet 3 : support informatique
```

Chaque commande recopie `data/<sujet>.json` dans `db.json` puis démarre le serveur : chaque démarrage repart des données initiales. Les ajouts, modifications et suppressions sont écrits dans `db.json` (ignoré par Git).

## Dates relatives

Dans `data/*.json`, les dates s'écrivent `{{J+3}}` (dans 3 jours) ou `{{J-2}}` (il y a 2 jours). Le script `reset.cjs` les remplace par de vraies dates au démarrage : les réservations restent à venir et les prêts en retard restent en retard, quel que soit le jour de la séance.

## Ce que fait le serveur

- `routes.json` ajoute le préfixe `/api`.
- `middleware.cjs` fixe les valeurs que seul le serveur doit décider à la création : `returnedAt: null` pour un prêt, `status: "open"`, `assignee: null` et `createdAt` pour un ticket, `createdAt` pour un commentaire.
- Tout le reste est accepté sans contrôle. Les règles métier de votre sujet sont à coder dans le front (et dans une API NestJS pour le bonus).

## Requêtes utiles (json-server 0.17)

| Besoin | Requête |
|---|---|
| Filtrer sur un champ | `GET /api/bookings?roomId=1` |
| Comparer | `GET /api/rooms?capacity_gte=10` |
| Trier | `GET /api/bookings?_sort=date,start` |
| Recherche plein texte | `GET /api/tickets?q=wifi` |
| Inclure les enfants | `GET /api/rooms/1?_embed=bookings` |
| Inclure le parent | `GET /api/loans?_expand=item` |
| Modifier un champ | `PATCH /api/loans/2` avec `{ "returnedAt": "2026-11-02" }` |

`_expand=item` suppose un champ `itemId` ; `_embed=bookings` suppose un champ `roomId` dans les réservations.

Le front se branche avec le même `proxy.conf.json` qu'en séance 7 (`/api` vers `http://localhost:3000`).

# Projet Filtre d'Âge

Ce projet Node.js implémente une fonction qui filtre une liste d'utilisateurs en fonction de leur âge, ne retournant que ceux qui ont 18 ans ou plus.

## Fonctionnalités

- Calcule précisément l'âge en fonction de la date de naissance
- Gère les dates de naissance des années bissextiles
- Inclut une suite de tests complète
- Gère correctement les cas limites et les dates invalides

## Installation

```bash
npm install
```

## Utilisation

```javascript
const { getAdults } = require('./src/index');

const users = [
    { name: "Alice", dob: "2000-02-29" },
    { name: "Bob", dob: "1990-12-31" },
    { name: "Charlie", dob: "2005-08-28" },
];

const utilisateursMajeurs = getAdults(users);
console.log(utilisateursMajeurs);
```

## Tests

Exécutez les tests avec :

```bash
npm test
```

## Détails d'Implémentation

La fonction `getAdults` :
- Prend un tableau d'objets utilisateur avec les propriétés `name` et `dob`
- Calcule l'âge en tenant compte de la date exacte de naissance (pas seulement l'année)
- Retourne un tableau contenant uniquement les utilisateurs de 18 ans ou plus
- Gère les cas particuliers comme les années bissextiles et les dates invalides

## Structure du Projet

```
.
├── src/
│   ├── index.js         # Implémentation principale
│   └── index.test.js    # Suite de tests
├── package.json
└── README.md
```
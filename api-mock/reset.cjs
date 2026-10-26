// Recopie le jeu de donnees du sujet dans db.json, en remplacant les dates
// relatives par de vraies dates : "{{J+3}}" devient la date dans 3 jours,
// "{{J-2}}" celle d'il y a 2 jours. Les donnees restent coherentes quel que
// soit le jour de la seance (prets en retard, reservations a venir...).
const fs = require('node:fs');
const path = require('node:path');

const subject = process.argv[2];
const source = path.join(__dirname, 'data', `${subject}.json`);
if (!fs.existsSync(source)) {
  console.error(`Sujet inconnu : ${subject}. Choix possibles : salles, materiel, support.`);
  process.exit(1);
}

function isoDate(offsetInDays) {
  const date = new Date();
  date.setDate(date.getDate() + offsetInDays);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

const text = fs
  .readFileSync(source, 'utf8')
  .replace(/\{\{J([+-]\d+)\}\}/g, (_, offset) => isoDate(Number(offset)));
fs.writeFileSync(path.join(__dirname, 'db.json'), text);
console.log(`db.json pret pour le sujet "${subject}".`);

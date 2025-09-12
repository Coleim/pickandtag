

// Niveau	Titre	XP requis (total cumulé)
// 14	4 500 XP
// 15	Maître du tri 📦	5 800 XP
// 16	Éco-architecte 🏛️	7 400 XP
// 17	Gardien de la Terre 🌍	9 500 XP
// 18	Héros légendaire 🏆	12 000 XP
// 19	Champion éternel 🔥	15 000 XP
// 20	Avatar de Gaïa 🌌	19 000 XP

import { Level } from "@/types/level";


export const levels: Level[] = [
  { level: 1, title: "Apprenti écolo 🌱", xpRequired: 10 },
  { level: 2, title: "Cueilleur curieux 🍃", xpRequired: 50 },
  { level: 3, title: "Ramasseur motivé 💪", xpRequired: 120 },
  { level: 4, title: "Nettoyeur local 🧹", xpRequired: 200 },
  { level: 5, title: "Protecteur de quartier 🏘️", xpRequired: 300 },
  { level: 6, title: "Gardien des rues 🚧", xpRequired: 450 },
  { level: 7, title: "Chasseur de déchets 🏹", xpRequired: 650 },
  { level: 8, title: "Éclaireur vert 🔦", xpRequired: 900 },
  { level: 9, title: "Défenseur de la nature 🦉", xpRequired: 1200 },
  { level: 10, title: "Héros du recyclage 🦸", xpRequired: 1600 },
  { level: 11, title: "Éco-guerrier ⚔️", xpRequired: 2100 },
  { level: 12, title: "Chevalier vert 🛡️", xpRequired: 2700 },
  { level: 13, title: "Capitaine planète 🚀", xpRequired: 3500 },
  { level: 14, title: "Sauveur des océans 🌊", xpRequired: 4500 },
  { level: 14, title: "Maître du tri 📦", xpRequired: 5800 },

];


export function getLevelForXP(xp: number): { current: Level, next: Level } {
  const current = levels.findLastIndex(lvl => lvl.xpRequired <= xp);
  if (current < 0) return { current: levels[0], next: levels[1] };
  return { current: levels[current], next: levels[current + 1] }
};

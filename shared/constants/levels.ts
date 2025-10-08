

import { Level } from "@/shared/types/level";


export const levels: Level[] = [
  { level: 1, title: "Apprenti écolo 🌱", xpRequired: 1 },
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
  { level: 13, title: "Champion écologique 🏆", xpRequired: 3500 },
  { level: 14, title: "Héros légendaire 🔥", xpRequired: 4500 },
  { level: 15, title: "Protecteur des forêts 🌲", xpRequired: 5800 },
  { level: 16, title: "Maître du tri 📦", xpRequired: 7400 },
  { level: 17, title: "Gardien des rivières 💧", xpRequired: 9500 },
  { level: 18, title: "Éco-architecte 🏛️", xpRequired: 12000 },
  { level: 19, title: "Souverain de la nature 👑", xpRequired: 15000 },
  { level: 20, title: "Avatar de Gaïa 🌌", xpRequired: 19000 },
  { level: 21, title: "Sentinelle des océans 🌊", xpRequired: 23500 },
  { level: 22, title: "Gardien des montagnes ⛰️", xpRequired: 28500 },
  { level: 23, title: "Maître des éléments ⚡", xpRequired: 34000 },
  { level: 24, title: "Ambassadeur du vivant 🐾", xpRequired: 40000 },
  { level: 25, title: "Éveilleur des consciences 🕊️", xpRequired: 46500 },
  { level: 26, title: "Visionnaire durable 🔭", xpRequired: 53500 },
  { level: 27, title: "Protecteur universel 🌠", xpRequired: 61000 },
  { level: 28, title: "Phare de l’écologie 🕯️", xpRequired: 69000 },
  { level: 29, title: "Maître de la biosphère 🌐", xpRequired: 77500 },
  { level: 30, title: "Gardien du renouveau 🌸", xpRequired: 86500 },
  { level: 31, title: "Architecte de l’harmonie 🌀", xpRequired: 96000 },
  { level: 32, title: "Champion galactique 🌌", xpRequired: 106000 },
  { level: 33, title: "Sage élémentaire 🔮", xpRequired: 117000 },
  { level: 34, title: "Héraut du vivant 🎺", xpRequired: 129000 },
  { level: 35, title: "Prophète du renouveau 🌻", xpRequired: 142000 },
  { level: 36, title: "Gardien cosmique 🪐", xpRequired: 156000 },
  { level: 37, title: "Maître de la planète 🌍", xpRequired: 171000 },
  { level: 38, title: "Émissaire de Gaïa 🌏", xpRequired: 187000 },
  { level: 39, title: "Légende verte 💫", xpRequired: 204000 },
  { level: 40, title: "Sage universel 🕊️", xpRequired: 222000 },
  { level: 41, title: "Commandant de la vie 🌱", xpRequired: 241000 },
  { level: 42, title: "Gardien éternel 🌟", xpRequired: 261000 },
  { level: 43, title: "Divinité de la Terre 🌎", xpRequired: 282000 },
  { level: 44, title: "Maître du cycle éternel ♻️", xpRequired: 304000 },
  { level: 45, title: "Essence de la nature 💖", xpRequired: 327000 },
  { level: 46, title: "Harmonie incarnée 🌸", xpRequired: 351000 },
  { level: 47, title: "Champion de l’univers 🌌", xpRequired: 376000 },
  { level: 48, title: "Phare de l’humanité 🕯️", xpRequired: 402000 },
  { level: 49, title: "Souverain cosmique 👑", xpRequired: 429000 },
  { level: 50, title: "Avatar légendaire de Gaïa 🌟", xpRequired: 457000 }
];



export function getLevelForXP(xp: number): { current: Level, next: Level } {
  const current = levels.findLastIndex(lvl => lvl.xpRequired <= xp);
  if (current < 0) return { current: levels[0], next: levels[1] };
  return { current: levels[current], next: levels[current + 1] }
};

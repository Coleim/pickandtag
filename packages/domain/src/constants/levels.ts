import { type Level } from "../types/level";

export const levels: Level[] = [
  { level: 1, title: "Apprenti écolo 🌱", xpRequired: 0 },
  { level: 2, title: "Cueilleur curieux 🍃", xpRequired: 100 },
  { level: 3, title: "Ramasseur motivé 💪", xpRequired: 250 },
  { level: 4, title: "Nettoyeur local 🧹", xpRequired: 450 },
  { level: 5, title: "Protecteur de quartier 🏘️", xpRequired: 700 },
  { level: 6, title: "Gardien des rues 🚧", xpRequired: 1000 },
  { level: 7, title: "Chasseur de déchets 🏹", xpRequired: 1350 },
  { level: 8, title: "Éclaireur vert 🔦", xpRequired: 1750 },
  { level: 9, title: "Défenseur de la nature 🦉", xpRequired: 2200 },
  { level: 10, title: "Héros du recyclage 🦸", xpRequired: 2700 },
  { level: 11, title: "Éco-guerrier ⚔️", xpRequired: 3300 },
  { level: 12, title: "Chevalier vert 🛡️", xpRequired: 4000 },
  { level: 13, title: "Champion écologique 🏆", xpRequired: 4800 },
  { level: 14, title: "Héros légendaire 🔥", xpRequired: 5700 },
  { level: 15, title: "Protecteur des forêts 🌲", xpRequired: 6700 },
  { level: 16, title: "Maître du tri 📦", xpRequired: 7900 },
  { level: 17, title: "Gardien des rivières 💧", xpRequired: 9300 },
  { level: 18, title: "Éco-architecte 🏛️", xpRequired: 10900 },
  { level: 19, title: "Souverain de la nature 👑", xpRequired: 12700 },
  { level: 20, title: "Avatar de Gaïa 🌌", xpRequired: 14700 },
  { level: 21, title: "Sentinelle des océans 🌊", xpRequired: 17000 },
  { level: 22, title: "Gardien des montagnes ⛰️", xpRequired: 19600 },
  { level: 23, title: "Maître des éléments ⚡", xpRequired: 22500 },
  { level: 24, title: "Ambassadeur du vivant 🐾", xpRequired: 25700 },
  { level: 25, title: "Éveilleur des consciences 🕊️", xpRequired: 29300 },
  { level: 26, title: "Visionnaire durable 🔭", xpRequired: 33300 },
  { level: 27, title: "Protecteur universel 🌠", xpRequired: 37700 },
  { level: 28, title: "Phare de l'écologie 🕯️", xpRequired: 42600 },
  { level: 29, title: "Maître de la biosphère 🌐", xpRequired: 48000 },
  { level: 30, title: "Gardien du renouveau 🌸", xpRequired: 54000 },
  { level: 31, title: "Architecte de l'harmonie 🌀", xpRequired: 60600 },
  { level: 32, title: "Champion galactique 🌌", xpRequired: 67900 },
  { level: 33, title: "Sage élémentaire 🔮", xpRequired: 75900 },
  { level: 34, title: "Héraut du vivant 🎺", xpRequired: 84700 },
  { level: 35, title: "Prophète du renouveau 🌻", xpRequired: 94400 },
  { level: 36, title: "Gardien cosmique 🪐", xpRequired: 105000 },
  { level: 37, title: "Maître de la planète 🌍", xpRequired: 116600 },
  { level: 38, title: "Émissaire de Gaïa 🌏", xpRequired: 129300 },
  { level: 39, title: "Légende verte 💫", xpRequired: 143200 },
  { level: 40, title: "Sage universel 🕊️", xpRequired: 158400 },
  { level: 41, title: "Commandant de la vie 🌱", xpRequired: 175000 },
  { level: 42, title: "Gardien éternel 🌟", xpRequired: 193100 },
  { level: 43, title: "Divinité de la Terre 🌎", xpRequired: 212800 },
  { level: 44, title: "Maître du cycle éternel ♻️", xpRequired: 234300 },
  { level: 45, title: "Essence de la nature 💖", xpRequired: 257700 },
  { level: 46, title: "Harmonie incarnée 🌸", xpRequired: 283200 },
  { level: 47, title: "Champion de l'univers 🌌", xpRequired: 311000 },
  { level: 48, title: "Phare de l'humanité 🕯️", xpRequired: 341300 },
  { level: 49, title: "Souverain cosmique 👑", xpRequired: 374300 },
  { level: 50, title: "Avatar légendaire de Gaïa 🌟", xpRequired: 410300 }
];


export function getLevelForXP(xp: number): { current: Level, next: Level } {
  const current = levels.findLastIndex(lvl => lvl.xpRequired <= xp);
  if (current < 0) return { current: levels[0], next: levels[1] };
  return { current: levels[current], next: levels[current + 1] }
};

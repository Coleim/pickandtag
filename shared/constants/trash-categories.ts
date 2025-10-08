import { CategoryConfig } from "@/shared/types/categoryConfig";
import { TrashCount } from "@/shared/types/trash";
import { Colors } from "./colors";

// Categories mises à jour
export const TrashCategories: CategoryConfig = {
  Plastique: { color: Colors.plastic, icon: "recycle", label: "Plastique", points: 5 },
  Polystyrene: { color: Colors.poly, icon: "boxes", label: "Polystyrène", points: 7 },
  Papier: { color: Colors.paper, icon: "file-alt", label: "Papier", points: 4 },
  Verre: { color: Colors.glass, icon: "wine-bottle", label: "Verre", points: 8 },
  Metal: { color: Colors.metal, icon: "tools", label: "Métal", points: 10 },
  Autre: { color: Colors.otherCategory, icon: "trash", label: "Autre", points: 5 },
};

export function getCategoryBreakdown(trashes: TrashCount[]) {
  const map: Record<string, number> = {};
  for (let trash of trashes) {
    if (trash.category) {
      map[trash.category] = (map[trash.category] ?? 0) + trash.count;
    }
  }
  return Object.entries(map).map(([type, amount]) => ({ type, amount }));
}


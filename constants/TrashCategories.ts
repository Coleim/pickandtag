import { CategoryConfig } from "@/types/categoryConfig";
import { Colors } from "./Colors";

// Categories mises à jour
export const TrashCategories: CategoryConfig = {
  Plastique: { color: Colors.plastic, icon: "recycle", label: "Plastique", points: 5 },
  Polystyrene: { color: Colors.poly, icon: "boxes", label: "Polystyrène", points: 7 },
  Papier: { color: Colors.paper, icon: "file-alt", label: "Papier", points: 4 },
  Verre: { color: Colors.glass, icon: "wine-bottle", label: "Verre", points: 8 },
  Metal: { color: Colors.metal, icon: "tools", label: "Métal", points: 10 },
  Autre: { color: Colors.otherCategory, icon: "trash", label: "Autre", points: 5 },
};






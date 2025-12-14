import { FontAwesome5 } from "@expo/vector-icons";

export type CategoryConfigDetails = { color: string; icon: keyof typeof FontAwesome5.glyphMap, label: string, points: number }

export type CategoryConfig = Record<
  string, CategoryConfigDetails
> 

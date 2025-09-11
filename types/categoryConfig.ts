import { FontAwesome5 } from "@expo/vector-icons";


export type CategoryConfig = Record<
  string,
  { color: string; icon: keyof typeof FontAwesome5.glyphMap, label: string, points: number }
> 

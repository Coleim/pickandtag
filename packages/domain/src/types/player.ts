import { type Level } from "./level";

export type Player = {
  id: string;
  displayName: string;
  xp: number;
  level: Level;
  totalItems: number;
  updated_at: Date;
}

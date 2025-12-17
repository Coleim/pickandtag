import type { Player } from "@pickandtag/domain";
import PlayerList from "../components/PlayerList";
import PlayerSearch from "../components/PlayerSearch";


export default function PlayerSearchPage() {

  const fakePlayers: Player[] = [
    {
      id: "",
      displayName: "PixelFox",
      xp: 2450,
      level: 12,
      totalItems: 34,
      updated_at: new Date("2025-12-17T10:00:00Z"),
    },
    {
      id: "",
      displayName: "GleamSlime",
      xp: 3890,
      level: 15,
      totalItems: 56,
      updated_at: new Date("2025-12-17T09:30:00Z"),
    },
    {
      id: "",
      displayName: "ShadowBlade",
      xp: 1820,
      level: 9,
      totalItems: 22,
      updated_at: new Date("2025-12-17T08:45:00Z"),
    },
    {
      id: "",
      displayName: "LunaMage",
      xp: 4120,
      level: 16,
      totalItems: 60,
      updated_at: new Date("2025-12-17T11:15:00Z"),
    },
    {
      id: "",
      displayName: "RocketRacer",
      xp: 2780,
      level: 13,
      totalItems: 40,
      updated_at: new Date("2025-12-17T10:45:00Z"),
    },
  ];
  return (
    <div>
      <PlayerSearch />
      <PlayerList players={fakePlayers} />
    </div>
  )
}

## Code Review

Format: file:path — line — comment

- app/_layout.tsx — 8 — Consider driving readiness from central app-init to avoid local drift.
- app/_layout.tsx — 9 — If using expo-splash-screen, manage hide to prevent flicker.
- app/(tabs)/_layout.tsx — 11 — Memoize/use selector to prevent unnecessary rerenders from store changes.
- app/(tabs)/_layout.tsx — 48 — Configure tabBarStyle/background and Android gesture insets.
- app/(tabs)/index.tsx — 16 — Use a selector to subscribe only to needed store slices.
- app/(tabs)/index.tsx — 25 — If categories are stable, improve memoization for breakdown.
- app/(tabs)/index.tsx — 51 — Virtualize long lists; use FlatList (already used in child) and ensure keyExtractor.
- app/(tabs)/index.tsx — 55 — Add haptic feedback on FAB press for UX.
- stores/player-store.ts — 31 — Wrap DB calls in try/catch to expose recoverable error state.
- stores/player-store.ts — 70 — Avoid side-effectful initialization at import; bootstrap explicitly in app root.
- stores/player-store.ts — 105 — Use prev in setState consistently; avoid reading playerStore.state.
- app/collect/new-trash.tsx — 19 — Initialize lat/lon as numbers; format on render to keep types.
- app/collect/new-trash.tsx — 26 — Show user-visible message when permission is denied.
- app/collect/new-trash.tsx — 79 — Handle DB errors with Toast/Alert for user feedback.
- components/global/buttons.tsx — 23 — Provide default loadingTitle to avoid empty text.
- components/home/player-stats.tsx — 10 — Memoize getLevelForXP result if currentXp changes often.
- components/home/player-stats.tsx — 22 — Guard ShareTwitter for web and add analytics.
- components/home/last-collects.tsx — 16 — Avoid in-place sort; clone array before sorting.
- components/home/last-collects.tsx — 30 — Add ListEmptyComponent and contentContainerStyle for spacing.
- components/collect/trash-details.tsx — 10 — Require explicit category selection; default may bias data.
- components/collect/trash-details.tsx — 19 — Base64 images are heavy; consider resizing/caching.
- components/collect/trash-details.tsx — 30 — Disable buttons until valid; add haptic feedback.
- constants/Colors.ts — 19 — Centralize spacing/typography; add dark mode variants.

## Componentization Proposals

- app/(tabs)/index.tsx — 37 — Extract StatsHeader component (title + count + TrashBreakdown) for reuse and readability.
- app/(tabs)/index.tsx — 55 — Create AddTrashFab that wraps navigation/haptics.
- components/home/player-stats.tsx — 20 — Extract LevelBadge/Title from XPSection to keep concerns separated.
- components/collect/trash-details.tsx — 25 — Extract CategorySelect block (label + picker + validation) for reuse.
- components/global/buttons.tsx — 33 — Provide AddTrashFab abstraction exporting a single-purpose FAB.
- app/_layout.tsx — 14 — Introduce AppInitGate that handles permissions + store init + splash hide before showing tabs.


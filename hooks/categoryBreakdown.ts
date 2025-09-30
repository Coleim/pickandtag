import { getCategoryBreakdown } from "@/constants/TrashCategories";
import { TrashCount } from "@/types/trash";
import { useMemo } from "react";

export function useCategoryBreakdown(trashes: TrashCount[], useCount = false) {
  return useMemo(() => getCategoryBreakdown(trashes, { useCount }), [trashes, useCount]);
}

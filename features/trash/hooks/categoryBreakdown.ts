import { getCategoryBreakdown } from "@/shared/constants/trash-categories";
import { TrashCount } from "@/shared/types/trash";
import { useMemo } from "react";

export function useCategoryBreakdown(trashes: TrashCount[], useCount = false) {
  return useMemo(() => getCategoryBreakdown(trashes, { useCount }), [trashes, useCount]);
}

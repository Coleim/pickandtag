import { getCategoryBreakdown } from "@/shared/constants/trash-categories";
import { TrashCount } from "@/types/trash";
import { useMemo } from "react";

export function useCategoryBreakdown(trashes: TrashCount[]) {
  return useMemo(() => getCategoryBreakdown(trashes), [trashes]);
}

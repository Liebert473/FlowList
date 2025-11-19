import { useMemo} from "react";
import type { ItemType, ColumnType, SortState } from "@/types/types"; // Your type definitions
import { useValues } from "@/features/values/useValues";

export function useSortedItems(
  items: ItemType[],
  sortState: SortState,
  columns: ColumnType[]
) {
  const { columnId, direction } = sortState;
  const safeColumnId = columnId ?? "";

  // 1. Find the active column definition
  const activeColumn = useMemo(
    () => columns.find((c) => c.id === columnId),
    [columns, columnId]
  );

  // 2. Determine if we need to fetch values
  // We only want to pass an ID to useValues if it's a choice/multiChoice column.
  // If it's "Text" or "Date", we pass null/undefined to prevent unnecessary requests.
  const shouldFetchValues =
    activeColumn &&
    (activeColumn.type === "choice" || activeColumn.type === "multiChoice");

  const targetColumnId = shouldFetchValues ? safeColumnId : "";

  // 3. Call your hook
  // Note: Your useValues hook should handle 'undefined' by setting { enabled: false } internally
  const {
    data: columnValues = [],
    isLoading: isLoadingValues,
  } = useValues(targetColumnId);

  // 4. Perform the Sort
  const sortedItems = useMemo(() => {
    // If no sort active, return original
    if (!columnId || !activeColumn) return items;

    // If we need values to sort (choice types) but they are still loading, wait.
    if (shouldFetchValues && isLoadingValues) return items;

    return [...items].sort((a, b) => {
      // Direct access (Supabase object)
      const dataA = a.data ? a.data[columnId] : null;
      const dataB = b.data ? b.data[columnId] : null;

      // Null handling (push nulls to bottom)
      if (dataA === dataB) return 0;
      if (!dataA) return 1;
      if (!dataB) return -1;

      let compareResult = 0;

      switch (activeColumn.type) {
        case "text":
          compareResult = String(dataA).localeCompare(String(dataB));
          break;

        case "date":
          // Compare timestamps
          compareResult = new Date(dataA).getTime() - new Date(dataB).getTime();
          break;

        case "choice":
        case "multiChoice":
          // Use the values from your hook to resolve Labels
          // dataA is typically an array ["uuid"]
          const idA = Array.isArray(dataA) ? dataA[0] : dataA;
          const idB = Array.isArray(dataB) ? dataB[0] : dataB;

          const labelA = columnValues.find((v: any) => v.id === idA)?.label || "";
          const labelB = columnValues.find((v: any) => v.id === idB)?.label || "";

          compareResult = labelA.localeCompare(labelB);
          break;

        default:
          compareResult = String(dataA).localeCompare(String(dataB));
      }

      return direction === "asc" ? compareResult : -compareResult;
    });
  }, [items, columnId, direction, activeColumn, columnValues, isLoadingValues, shouldFetchValues]);


  return {
    sortedItems,
    isSorting: shouldFetchValues && isLoadingValues,
  };
}
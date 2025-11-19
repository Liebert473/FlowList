import { isSameDay, parseISO } from "date-fns";
import type { ItemType, FilterState } from "@/types/types"; 

export function getFilteredItems(
  items: ItemType[],
  filters: FilterState
): ItemType[] {
  
  // Quick exit if no filters
  if (Object.keys(filters).length === 0) return items;

  return items.filter((item) => {
    // DIRECT ACCESS: Supabase already gave us an object
    const itemData = item.data || {}; 

    return Object.entries(filters).every(([columnId, filterValue]) => {
      const cellValue = itemData[columnId]; 

      // 1. Text Filter
      if (typeof filterValue === "string") {
        if (!cellValue) return false;
        return String(cellValue).toLowerCase().includes(filterValue.toLowerCase());
      }

      // 2. Date Filter
      if (filterValue instanceof Date) {
        if (!cellValue) return false;
        // cellValue from Supabase is an ISO string "2025-11-17T..."
        return isSameDay(parseISO(cellValue), filterValue);
      }

      // 3. Choice / MultiChoice (Array check)
      if (Array.isArray(filterValue)) {
        if (filterValue.length === 0) return true;
        
        // Safety check: cellValue might be null or undefined
        const cellArray = Array.isArray(cellValue) ? cellValue : [];
        
        // Does the cell contain ANY of the selected filter IDs?
        return filterValue.some((id) => cellArray.includes(id));
      }

      return true;
    });
  });
}
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import type { ColumnType, SortState } from "@/types/types";

interface TableSortButtonProps {
  columns: ColumnType[];
  sortState: SortState;
  onSortChange: (state: SortState) => void;
}

export function TableSortButton({
  columns,
  sortState,
  onSortChange,
}: TableSortButtonProps) {
  const handleSort = (colId: string) => {
    // If clicking the same column, toggle direction
    if (sortState.columnId === colId) {
      onSortChange({
        columnId: colId,
        direction: sortState.direction === "asc" ? "desc" : "asc",
      });
    } else {
      // New column selected, default to Ascending
      onSortChange({
        columnId: colId,
        direction: "asc",
      });
    }
  };

  const clearSort = () => {
    onSortChange({ columnId: null, direction: "asc" });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`px-4 py-2 border border-fl-border hover:bg-fl-hover cursor-pointer gap-2 flex items-center rounded-md flex-1 ${
              sortState.columnId
                ? "text-fl-text"
                : "text-fl-info hover:text-fl-text"
            }
            md:rounded-full md:flex-0
            `}
          >
            <ArrowUpDown className="h-4 w-4" />
            <span className="text-sm">Sort</span>
            {sortState.columnId && (
              <span className="ml-1 text-xs text-fl-primary whitespace-nowrap">
                {columns.find((c) => c.id === sortState.columnId)?.title}
                {sortState.direction === "asc" ? " (A-Z)" : " (Z-A)"}
              </span>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {columns.map((col) => {
            const isActive = sortState.columnId === col.id;
            return (
              <DropdownMenuItem
                key={col.id}
                onClick={() => handleSort(col.id)}
                className="justify-between"
              >
                {col.title}
                {isActive &&
                  (sortState.direction === "asc" ? (
                    <ArrowUp className="h-3 w-3 opacity-70" />
                  ) : (
                    <ArrowDown className="h-3 w-3 opacity-70" />
                  ))}
              </DropdownMenuItem>
            );
          })}
          {sortState.columnId && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={clearSort}
                className="text-muted-foreground justify-center text-xs"
              >
                Clear Sort
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

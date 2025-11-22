import { MagnifyingGlass, HurricaneIcon } from "@phosphor-icons/react";
import { type SortState, type TableType } from "@/types/types";
import { useCreateItem } from "@/features/items/useCreateItem";
import { TableFilterButton } from "@/components/table/filter/TableFilterButton";
import type { ColumnType, FilterState } from "@/types/types";
import { TableSortButton } from "./sort/TableSortButton";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface TableHeaderProps {
  table: TableType;
  columns: ColumnType[];
  // Controlled Props
  search: string;
  onSearchChange: (val: string) => void;
  filters: FilterState;
  onFilterChange: (val: FilterState) => void;
  sortState: SortState;
  onSortChange: (val: SortState) => void;
}

export default function TableHeader({
  table,
  columns,
  search,
  onSearchChange,
  filters,
  onFilterChange,
  sortState,
  onSortChange,
}: TableHeaderProps) {
  const createItem = useCreateItem();
  const handelCreateItem = () => {
    createItem.mutate({
      table_id: table.id,
      id: crypto.randomUUID(),
      data: {},
      created_at: new Date().toISOString(),
    });
  };
  return (
    <div className="flex items-center justify-between border-b border-fl-border py-4 px-6">
      {/* Left side: Title */}
      <h2 className="text-xl font-semibold text-fl-text relative">
        {table?.title ?? "Not Found"}
        <span className="block w-10 h-0.5 bg-fl-primary mt-1 rounded"></span>
      </h2>

      {/* Right side: Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* ========================================= */}
        {/* DESKTOP VIEW (Hidden on mobile)           */}
        {/* ========================================= */}
        <div className="hidden md:flex items-center gap-3">
          <TableFilterButton
            filters={filters}
            columns={columns || []}
            onApplyFilters={onFilterChange}
            onResetFilters={() => onFilterChange({})}
          />

          <TableSortButton
            columns={columns || []}
            sortState={sortState}
            onSortChange={onSortChange}
          />

          {/* Desktop Search Bar */}
          <div className="flex items-center border border-fl-border rounded-full px-3 py-1.5 text-fl-text bg-transparent w-52 focus-within:ring-1 focus-within:ring-fl-primary">
            <MagnifyingGlass size={18} className="opacity-70" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm ml-2 placeholder:text-fl-text/60 w-full"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* ========================================= */}
        {/* MOBILE VIEW (Collapsed into Popover)      */}
        {/* ========================================= */}
        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-fl-border!"
              >
                <HurricaneIcon size={18} />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-[260px] p-3 space-y-3 block md:hidden"
            >
              {/* Mobile Search Bar */}
              <div className="flex items-center border border-fl-border rounded-md px-3 py-2 text-fl-text bg-transparent w-full focus-within:ring-1 focus-within:ring-fl-primary">
                <MagnifyingGlass size={18} className="opacity-70" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm ml-2 placeholder:text-fl-text/60 w-full"
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>

              {/* Mobile Filter & Sort Row */}
              <div className="flex">
                <div className="flex flex-1 flex-col gap-2">
                  <TableFilterButton
                    filters={filters}
                    columns={columns || []}
                    onApplyFilters={onFilterChange}
                    onResetFilters={() => onFilterChange({})}
                  />
                  <TableSortButton
                    columns={columns || []}
                    sortState={sortState}
                    onSortChange={onSortChange}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* ========================================= */}
        {/* PRIMARY ACTION (Always Visible)           */}
        {/* ========================================= */}
        <button
          onClick={handelCreateItem}
          className="px-5 py-1.5 rounded-lg bg-fl-primary text-white text-sm font-medium hover:bg-fl-primary-hover transition cursor-pointer whitespace-nowrap"
        >
          New
        </button>
      </div>
    </div>
  );
}

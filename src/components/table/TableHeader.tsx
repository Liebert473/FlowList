import { MagnifyingGlass } from "@phosphor-icons/react";
import { type SortState, type ItemType, type TableType } from "@/types/types";
import { useCreateItem } from "@/features/items/useCreateItem";
import { useItems } from "@/features/items/useItems";
import { useColumns } from "@/features/columns/useColumns";
import { TableFilterButton } from "@/components/table/filter/TableFilterButton";
import { useEffect, useMemo } from "react";
import { getFilteredItems } from "@/components/table/filter/FilterLogic";
import type { FilterState } from "@/types/types";
import { useState } from "react";
import { TableSortButton } from "./sort/TableSortButton";
import { useSortedItems } from "./sort/SortLogic";

interface TableHeaderProps {
  table: TableType;
  onItemChange: (items: ItemType[]) => void;
}

export default function TableHeader({ table, onItemChange }: TableHeaderProps) {
  const { data: items } = useItems(table.id);
  const { data: columns } = useColumns(table.id);

  const [search, setSearch] = useState("");
  const titleColumn = columns?.find((col) => col.title == "Title");

  const [filters, setFilters] = useState<FilterState>({});
  const [sortState, setSortState] = useState<SortState>({
    columnId: null,
    direction: "asc",
  });

  const filteredItems = useMemo(() => {
    return getFilteredItems(items ?? [], filters);
  }, [items, filters]);

  const searched = useMemo(() => {
    if (!titleColumn) {
      return filteredItems;
    } else {
      return filteredItems?.filter((v) => {
        const value = v.data[titleColumn.id];
        return (
          value === undefined ||
          (typeof value === "string" &&
            value.toLowerCase().includes(search.toLowerCase()))
        );
      });
    }
  }, [filteredItems, search, titleColumn]);

  const { sortedItems, isSorting } = useSortedItems(
    searched,
    sortState,
    columns ?? []
  );

  useEffect(() => {
    if (!isSorting) {
      onItemChange(sortedItems);
    }
  }, [sortedItems, isSorting, items, onItemChange]);

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
      {/* Left side */}
      <h2 className="text-xl font-semibold text-fl-text relative">
        {table?.title ?? "Not Found"}
        <span className="block w-10 h-0.5 bg-fl-primary mt-1 rounded"></span>
      </h2>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Filter Buttons */}

        <TableFilterButton
          columns={columns || []}
          onApplyFilters={setFilters}
          onResetFilters={() => setFilters({})}
        />

        <TableSortButton
          columns={columns || []}
          sortState={sortState}
          onSortChange={setSortState}
        />

        {/* Search Bar */}
        <div className="flex items-center border border-fl-border rounded-full px-3 py-1.5 text-fl-text bg-transparent w-52 focus-within:ring-1 focus-within:ring-fl-primary">
          <MagnifyingGlass size={18} className="opacity-70" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm ml-2 placeholder:text-fl-text/60 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* New Button */}
        <button
          onClick={handelCreateItem}
          className="px-5 py-1.5 rounded-lg bg-fl-primary text-white text-sm font-medium hover:bg-fl-primary-hover transitio cursor-pointer"
        >
          New
        </button>
      </div>
    </div>
  );
}

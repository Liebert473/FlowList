import { type TableType } from "@/types/types";
import TableHeader from "@/components/table/TableHeader";
import Table from "@/components/table/Table";
import { useState } from "react";
import { useItems } from "@/features/items/useItems";
import { useColumns } from "@/features/columns/useColumns";
import { useMemo } from "react";
import type { FilterState, SortState } from "@/types/types";
import { getFilteredItems } from "./filter/FilterLogic";
import { useSortedItems } from "./sort/SortLogic";

interface TablePlaceProps {
  table: TableType;
}

export const TablePlace = ({ table }: TablePlaceProps) => {
  // 1. Fetch Raw Data
  const { data: rawItems = [] } = useItems(table.id);
  const { data: columns = [] } = useColumns(table.id);

  // 2. Control State (Lifted Up)
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>({});
  const [sortState, setSortState] = useState<SortState>({
    columnId: null,
    direction: "asc",
  });

  // 3. Filtering Logic (Derived State)
  // Find the Title column for the search bar
  const titleColumn = useMemo(
    () => columns.find((col) => col.title === "Title"),
    [columns]
  );

  // Apply Filters + Search
  const processedItems = useMemo(() => {
    // A. Apply Faceted Filters
    let result = getFilteredItems(rawItems, filters);

    // B. Apply Text Search (on Title column)
    if (search && titleColumn) {
      result = result.filter((v) => {
        const value = v.data[titleColumn.id];
        return (
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    return result;
  }, [rawItems, filters, search, titleColumn]);

  // 4. Sorting Logic (Using your Hook)
  const { sortedItems } = useSortedItems(processedItems, sortState, columns);

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <TableHeader
        table={table}
        columns={columns}
        // Search Props
        search={search}
        onSearchChange={setSearch}
        // Filter Props
        filters={filters}
        onFilterChange={setFilters}
        // Sort Props
        sortState={sortState}
        onSortChange={setSortState}
      />
      <div className="py-6 px-8 flex flex-1 overflow-auto">
        <Table
          columns={columns || []}
          items={sortedItems || []}
          table={table}
        />
      </div>
    </div>
  );
};

import { type ItemType } from "@/types/types";
import TableHeader from "@/components/table/TableHeader";
import Table from "@/components/table/Table";
import { useState } from "react";
import { useItems } from "@/features/items/useItems";
import { useColumns } from "@/features/columns/useColumns";
import { useMemo } from "react";
import type { FilterState, SortState, TableType } from "@/types/types";
import { getFilteredItems } from "./filter/FilterLogic";
import { useSortedItems } from "./sort/SortLogic";
import ItemPage from "./item/ItemPage";

interface TablePlaceProps {
  table: TableType | undefined;
}

export const TablePlace = ({ table }: TablePlaceProps) => {
  const { data: rawItems = [] } = useItems(table?.id ?? "");
  const { data: columns = [] } = useColumns(table?.id ?? "");

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

  const [isOpened, setIsOpened] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewItem, setViewItem] = useState<ItemType | null>(null);

  const handelViewItem = (item: ItemType) => {
    setIsOpened(true);
    setViewItem(item);
  };

  return (
    <div className="flex flex-col flex-1 overflow-auto relative">
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
          viewItem={handelViewItem}
          columns={columns || []}
          items={sortedItems || []}
          table={table}
        />
      </div>
      <ItemPage
        columns={columns}
        item={viewItem || undefined}
        isOpened={isOpened}
        isExpanded={isExpanded}
        onClose={() => setIsOpened(false)}
        onToggleExpand={() => setIsExpanded((prev) => !prev)}
      />
    </div>
  );
};

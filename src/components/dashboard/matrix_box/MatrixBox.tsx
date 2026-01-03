import React, { useState, useMemo, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useValues } from "@/features/values/useValues";
import { useItems } from "@/features/items/useItems";
import { useColumns } from "@/features/columns/useColumns";
import type { TableType } from "@/types/types";
import { ViewField } from "./ViewField";
import { FilterChoiceDropdown } from "./FilterChoice";

interface MatrixBoxProps {
  table: TableType;
  title: string;
  filter_column_key: string;
  display_column_key: string;
}

export const MatrixBox: React.FC<MatrixBoxProps> = ({
  table,
  title,
  filter_column_key,
  display_column_key,
}) => {
  // 1. Fetch Schema & Items
  const { data: items = [], isLoading: itemsLoading } = useItems(table.id);
  const { data: columns = [], isLoading: colsLoading } = useColumns(table.id);

  // Find column objects to get their UUIDs
  const filterCol = columns.find((c) => c.title === filter_column_key);
  const displayCol = columns.find((c) => c.title === display_column_key);
  const titleCol = columns.find((c) => c.title === "Title");

  // 2. Fetch Dynamic Values
  // Note: Hooks should handle 'undefined' or 'null' gracefully if data isn't ready
  const { data: filterOptions = [] } = useValues(filterCol?.id || "");

  // 3. Filter State
  const [activeFilter, setActiveFilter] = useState<string>("");

  // Sync activeFilter with the first available option once loaded
  useEffect(() => {
    if (filterOptions.length > 0 && !activeFilter) {
      setActiveFilter(filterOptions[0].id);
    }
  }, [filterOptions, activeFilter]);

  // 4. Filtering Logic
  const filteredItems = useMemo(() => {
    return items.filter((item: any) => {
      const val = item.data[filterCol?.id || ""];
      // Handles both array (multiChoice) and string (choice)
      return Array.isArray(val)
        ? val.includes(activeFilter)
        : val === activeFilter;
    });
  }, [items, activeFilter, filterCol]);

  const isLoading = itemsLoading || colsLoading;

  return (
    <div className="rounded-lg border border-fl-border p-4 flex flex-col h-full">
      {/* Header */}
      <div className="p-5 flex justify-between">
        <h2 className="text-xl font-semibold text-fl-text relative">
          {title}
          <span className="block w-20 h-0.5 bg-fl-primary mt-1 rounded"></span>
        </h2>

        <div className="flex hover:bg-fl-bg hover:outline hover:outline-fl-primary rounded-md h-12 px-2 cursor-pointer transition overflow-hidden">
          <FilterChoiceDropdown
            selectedValues={[activeFilter]}
            values={filterOptions}
            onSelect={setActiveFilter}
          />
        </div>
      </div>

      {/* Table Headers */}
      <div className="px-5 py-2 flex justify-between text-sm font-semibold text-fl-info uppercase tracking-wider border-b border-fl-border">
        {isLoading ? (
          <>
            <Skeleton className="h-4 w-18" />
            <Skeleton className="h-4 w-18" />
          </>
        ) : (
          <>
            <span>Title</span>
            <span>{displayCol?.title || "Value"}</span>
          </>
        )}
      </div>

      {/* List Items */}
      <div className="divide-y divide-fl-border overflow-y-auto custom-scroll">
        {isLoading ? (
          <div className="flex justify-between py-4 items-center border-b border-fl-border">
            {/* Title */}
            <Skeleton className="h-4 w-20" />
            {/* Priority */}
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="px-5 py-4 flex justify-between items-center hover:bg-fl-hover transition-colors"
            >
              <span className="text-sm font-medium text-fl-text truncate max-w-[70%]">
                {item.data[titleCol?.id || ""] || "Untitled"}
              </span>
              <div className="text-sm font-semibold text-fl-text">
                {displayCol && <ViewField column={displayCol} item={item} />}
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-sm text-slate-400">
            No items found.
          </div>
        )}
      </div>
    </div>
  );
};

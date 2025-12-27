import { useState, useMemo } from "react";
import { Check, Search } from "lucide-react";
import { X } from "@phosphor-icons/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import type { ColumnType, ItemType } from "@/types/types";

import { Skeleton } from "@/components/ui/skeleton";
import { useTables } from "@/features/tables/useTables";
import { useItems } from "@/features/items/useItems";
import { useColumns } from "@/features/columns/useColumns";

type RelationProps = {
  column: ColumnType;
  selectedItems: string[];
  onChange: (updated: any) => void;
};

export function RelationDropdown({
  column,
  selectedItems,
  onChange,
}: RelationProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: tables } = useTables();
  const table = tables?.filter(
    (t) =>
      t.id != column.table_id &&
      (t.title == "My Tasks" || t.title == "Projects")
  )[0];

  const { data: items } = useItems(table?.id || "");
  const { data: columns } = useColumns(table?.id || "");
  const titleCol = columns?.filter((col) => col.title == "Title")[0];

  const filtered = useMemo(() => {
    return items?.filter((v) =>
      v.data[titleCol?.id || ""].toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const toggleSelect = (item: ItemType) => {
    const exists = selectedItems.some((v) => v === item.id);

    if (exists) {
      onChange(selectedItems.filter((v) => v !== item.id));
    } else {
      onChange([...selectedItems, item.id]);
    }
  };

  if (!items) {
    return (
      <div className="flex gap-2 items-center">
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-4 w-8" />
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex-1 justify-start cursor-pointer flex gap-1 items-center">
          {selectedItems.length > 0 ? (
            items
              ?.filter((v) => selectedItems.includes(v.id))
              .map((item) => (
                <div
                  key={item.id}
                  className={` shrink-0 flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium text-fl-insider bg-fl-primary`}
                >
                  {item.data[titleCol?.id || ""]}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(item);
                    }}
                    className="hover:opacity-80 cursor-pointer"
                  >
                    <X size={14} weight="bold" />
                  </button>
                </div>
              ))
          ) : (
            <span className="text-muted-foreground">Select {"taks"}...</span>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-[260px]" align="start">
        <div className="p-2 border-b flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search…"
            className="outline-none text-fl-text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ScrollArea className="max-h-60 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col">
            {filtered?.map((item) => {
              const selected = selectedItems.some((v) => v === item.id);

              return (
                <button
                  key={item.id}
                  className={cn(
                    "flex w-full items-center px-3 py-2 text-left hover:bg-accent",
                    selected && "bg-accent/40"
                  )}
                  onClick={() => toggleSelect(item)}
                >
                  {/* Label */}
                  <div
                    className={`text-fl-insider py-1 px-3 rounded-md bg-fl-primary text-sm mr-1`}
                  >
                    {item.data[titleCol?.id || ""]}
                  </div>

                  {/* Right checkmark */}
                  {selected && <Check className="ml-auto h-4 w-4" />}
                </button>
              );
            })}

            {filtered?.length === 0 && (
              <p className="text-sm text-muted-foreground p-3 text-center">
                No results
              </p>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

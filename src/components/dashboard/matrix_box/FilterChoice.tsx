"use client";

import { useState, useMemo } from "react";
import { Check, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import type { ValueType } from "@/types/types";
import { colorClasses } from "@/utils/colors";
import type { Color } from "@/utils/colors";
import { Skeleton } from "@/components/ui/skeleton";

type FilterChoiceProps = {
  selectedValues: string[];
  values: ValueType[];
  onSelect: (id: string) => void;
};

export function FilterChoiceDropdown({
  selectedValues,
  values,
  onSelect,
}: FilterChoiceProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return values?.filter((v) =>
      v.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [values, search]);

  if (!values) {
    return (
      <div className="flex gap-2 items-center">
        <Skeleton className="h-4 w-20" />
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex-1 justify-start cursor-pointer flex gap-1 items-center">
          {selectedValues.length > 0 ? (
            values
              ?.filter((v) => selectedValues.includes(v.id))
              .map((tag) => (
                <div
                  key={tag.id}
                  className={` shrink-0 flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium ${
                    tag.color !== "mono" ? "text-white" : ""
                  } ${colorClasses[tag.color as Color].bg.normal}`}
                >
                  {tag.label}
                </div>
              ))
          ) : (
            <span className="text-muted-foreground">Select tags...</span>
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
              const selected = selectedValues.some((v) => v === item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={cn(
                    "flex w-full items-center px-3 py-2 text-left hover:bg-accent",
                    selected && "bg-accent/40"
                  )}
                >
                  {/* Label */}
                  <div
                    className={`${
                      item.color !== "mono" ? "text-white" : ""
                    }  py-1 px-3 rounded-md ${
                      colorClasses[item.color as Color].bg.normal
                    } text-sm`}
                  >
                    {item.label}
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

import { useState } from "react";
import { Filter, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import type { ColumnType } from "@/types/types";
import { ChoiceFilterItem } from "./ChoiceFilterItem"; // Import the sub-component above

export type FilterState = Record<string, any>;

interface TableFilterButtonProps {
  columns: ColumnType[];
  filters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  onResetFilters: () => void;
}

export function TableFilterButton({
  columns,
  filters,
  onApplyFilters,
  onResetFilters,
}: TableFilterButtonProps) {
  const [open, setOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterState>(filters);

  const activeCount = Object.keys(tempFilters).length;

  const handleFilterChange = (colId: string, value: any) => {
    setTempFilters((prev) => {
      const next = { ...prev };
      // Remove key if value is empty
      if (
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        delete next[colId];
      } else {
        next[colId] = value;
      }
      return next;
    });
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
    setOpen(false);
  };

  const handleReset = () => {
    setTempFilters({});
    onResetFilters();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={` ${
            activeCount > 0 ? "text-fl-text" : "text-fl-info hover:text-fl-text"
          } cursor-pointer flex py-2 px-4 items-center border border-fl-border hover:bg-fl-hover flex-1 gap-2 rounded-md relative text-sm
          lg:rounded-full lg:flex-0
          `}
        >
          <Filter className="h-4 w-4" />
          Filter
          {activeCount > 0 && (
            <div className="text-xs flex justify-center items-center h-4 w-4 rounded-full p-1 bg-fl-primary text-white absolute right-0 -top-1">
              {activeCount}
            </div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px] p-0" align="start">
        <div className="px-4 py-3 font-medium border-b text-sm">Filters</div>
        <ScrollArea className="h-[400px] p-4">
          <div className="space-y-5">
            {columns.map((col) => {
              const currentValue = tempFilters[col.id];

              // 1. TEXT TYPE
              if (col.type === "text") {
                return (
                  <div key={col.id} className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      {col.title}
                    </Label>
                    <Input
                      placeholder="Contains..."
                      className="h-8"
                      value={currentValue || ""}
                      onChange={(e) =>
                        handleFilterChange(col.id, e.target.value)
                      }
                    />
                  </div>
                );
              }

              // 2. CHOICE / MULTI-CHOICE TYPES
              // We delegate rendering to the sub-component so it can use the hook
              if (col.type === "choice" || col.type === "multiChoice") {
                return (
                  <ChoiceFilterItem
                    key={col.id}
                    column={col}
                    selectedIds={(currentValue as string[]) || []}
                    onChange={(newIds) => handleFilterChange(col.id, newIds)}
                  />
                );
              }

              // 3. DATE TYPE
              if (col.type === "date") {
                return (
                  <div key={col.id} className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      {col.title}
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-8",
                            !currentValue && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-3 w-3" />
                          {currentValue ? (
                            format(currentValue, "PP")
                          ) : (
                            <span>Pick date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={currentValue}
                          onSelect={(date) => handleFilterChange(col.id, date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </ScrollArea>
        <div className="flex justify-between p-3 border-t bg-muted/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-7 text-xs"
          >
            Reset
          </Button>
          <Button
            size="sm"
            onClick={handleApply}
            className="h-7 text-xs bg-fl-primary text-fl-insider hover:bg-fl-primary-hover"
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

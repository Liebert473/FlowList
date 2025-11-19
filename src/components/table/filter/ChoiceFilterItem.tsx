import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { ColumnType } from "@/types/types";
import { useValues } from "@/features/values/useValues";
import { colorClasses } from "@/utils/colors";

interface ChoiceFilterItemProps {
  column: ColumnType;
  selectedIds: string[]; // Current filter state for this column
  onChange: (newIds: string[]) => void;
}

export function ChoiceFilterItem({
  column,
  selectedIds,
  onChange,
}: ChoiceFilterItemProps) {
  // 1. Fetch values specifically for this column
  const { data: values = [] } = useValues(column.id);

  const handleSelect = (optionId: string) => {
    const isSelected = selectedIds.includes(optionId);

    if (column.type === "choice") {
      // Single select behavior: toggle on/off
      onChange(isSelected ? [] : [optionId]);
    } else {
      // Multi select behavior: add/remove from array
      onChange(
        isSelected
          ? selectedIds.filter((id) => id !== optionId)
          : [...selectedIds, optionId]
      );
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs text-muted-foreground">{column.title}</Label>
      <div className="border rounded-md p-1">
        {/* Selected Badges */}
        <div className="flex flex-wrap gap-1 mb-2 px-1">
          {selectedIds.length === 0 && (
            <span className="text-[10px] text-muted-foreground py-1">Any</span>
          )}
          {values
            .filter((opt) => selectedIds.includes(opt.id))
            .map((opt) => (
              <Badge
                key={opt.id}
                variant="outline"
                className="px-1 h-5 text-[10px] border-0"
                style={{ backgroundColor: opt.color + "20", color: opt.color }}
              >
                {opt.label}
              </Badge>
            ))}
        </div>

        {/* Searchable List */}
        <Command className="h-auto">
          <CommandInput
            placeholder={`Search ${column.title}...`}
            className="h-6 text-xs"
          />
          <CommandList className="max-h-[100px] custom-scrollbar">
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
              {values.map((option) => {
                const isSelected = selectedIds.includes(option.id);
                return (
                  <CommandItem
                    key={option.id}
                    value={option.label}
                    onSelect={() => handleSelect(option.id)}
                    className="text-xs py-1"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-3 w-3 items-center justify-center rounded-sm border border-primary",
                        isSelected ? "bg-fl-primary border-none" : "opacity-30"
                      )}
                    ></div>
                    <span className={colorClasses[option.color].text.normal}>
                      {option.label}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
}

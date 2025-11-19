"use client";

import { useState, useMemo } from "react";
import { Check, MoreHorizontal, Search } from "lucide-react";
import { X, TrashIcon } from "@phosphor-icons/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import type { ValueType } from "@/types/types";
import type { ColumnType } from "@/types/types";
import { useCreateValue } from "@/features/values/useCreateValues";
import { useValues } from "@/features/values/useValues";
import { colorClasses, getRandomColor, colors } from "@/utils/colors";
import type { Color } from "@/utils/colors";
import DebouncedInput from "./DebouncedInput";
import { useUpdateValue } from "@/features/values/useUpdateValue";

import { useDeleteValue } from "@/features/values/useDeleteValues";

type ChoiceProps = {
  column: ColumnType;
  selectedValues: string[];
  onChange: (updated: any) => void;
};

export function ChoiceDropdown({
  column,
  selectedValues,
  onChange,
}: ChoiceProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data: values } = useValues(column.id);
  const updateValue = useUpdateValue();
  const deleteValue = useDeleteValue();

  const createValue = useCreateValue();

  const handleCreateValue = () => {
    createValue.mutate({
      column_id: column.id,
      id: crypto.randomUUID(),
      color: getRandomColor(),
      label: search.trim() || "New Value",
    });
  };

  const filtered = useMemo(() => {
    return values?.filter((v) =>
      v.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [values, search]);

  const toggleSelect = (item: ValueType) => {
    const exists = selectedValues.some((v) => v === item.id);

    if (exists) {
      onChange(selectedValues.filter((v) => v !== item.id));
    } else {
      onChange([item.id]);
    }
  };

  const handelChanges = (id: string, update: Partial<ValueType>) => {
    updateValue.mutate({ id, column_id: column.id, update });
  };

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
                  className={` shrink-0 flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-white ${
                    colorClasses[tag.color as Color].bg.transparent
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      colorClasses[tag.color as Color].bg.normal
                    }`}
                  ></div>
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
                  className={cn(
                    "flex w-full items-center px-3 py-2 text-left hover:bg-accent",
                    selected && "bg-accent/40"
                  )}
                  onClick={() => toggleSelect(item)}
                >
                  {/* Left dots */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreHorizontal
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 mr-2 text-muted-foreground cursor-pointer"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-64"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-4 space-y-4">
                        {/* Label Input */}
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">
                            Label
                          </label>
                          <DebouncedInput
                            initialVal={item.label}
                            onChange={(changes: any) =>
                              handelChanges(item.id, { label: changes })
                            }
                          />
                        </div>

                        <DropdownMenuSeparator />

                        {/* Delete Button */}
                        <div
                          onClick={() => deleteValue.mutate(item)}
                          className=" mt-4 flex gap-2 items-center hover:bg-fl-hover cursor-pointer text-fl-text px-3 py-2 rounded-md"
                        >
                          <TrashIcon className="h-4 w-4" />
                          Delete
                        </div>

                        <DropdownMenuSeparator />

                        {/* Colors Section */}
                        <div>
                          <label className="text-xs font-medium text-muted-foreground block my-3">
                            Colors
                          </label>
                          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                            {colors.map((c) => (
                              <button
                                key={c}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handelChanges(item.id, { color: c });
                                }}
                                className="w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-accent transition-colors"
                              >
                                <div
                                  className={`h-6 w-6 rounded ${colorClasses[c].bg.normal}`}
                                />
                                <span className="text-sm flex-1 text-left">
                                  {c}
                                </span>
                                {item.color === c && (
                                  <span className="text-lg">✓</span>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Label */}
                  <div
                    className={`text-white py-1 px-3 rounded-full flex gap-2 items-center ${
                      colorClasses[item.color as Color].bg.transparent
                    } text-sm`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        colorClasses[item.color as Color].bg.normal
                      }`}
                    ></div>
                    {item.label}
                  </div>

                  {/* Right checkmark */}
                  {selected && <Check className="ml-auto h-4 w-4" />}
                </button>
              );
            })}

            {filtered?.length === 0 && (
              <>
                <p className="text-sm text-muted-foreground p-3 text-center">
                  No results
                </p>
                <button
                  className="cursor-pointer flex mx-3 mb-2 rounded-md items-center px-3 py-2 text-left bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  onClick={handleCreateValue}
                >
                  Create: "{search.trim() || "New Value"}"
                </button>
              </>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

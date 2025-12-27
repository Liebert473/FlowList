import { Checkbox } from "@/components/ui/checkbox";
import { DataField } from "./DataField";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { DotsThreeVerticalIcon, SidebarIcon } from "@phosphor-icons/react";
import type { ItemType, ColumnType } from "@/types/types";
import { useState } from "react";

interface ItemRowProps {
  item: ItemType;
  columns: ColumnType[];
  isSelected: boolean;
  onToggleSelect: (item: ItemType) => void;
  onOpen: (item: ItemType) => void;
  onDelete: (item: ItemType) => void;
  onDuplicate: (item: ItemType) => void;
}

export function ItemRow({
  item,
  columns,
  isSelected,
  onToggleSelect,
  onOpen,
  onDelete,
  onDuplicate,
}: ItemRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="px-8 hover:bg-fl-hover transition-colors"
    >
      <div
        className="grid items-center border-b border-fl-border text-sm"
        style={{
          gridTemplateColumns: `repeat(${
            columns.length * 2 + 1
          }, minmax(0, 1fr))`,
        }}
      >
        {/* Select + Open */}
        <div className="flex justify-between items-center">
          <Checkbox
            checked={isSelected}
            onClick={() => onToggleSelect(item)}
            className="rounded-md w-5 h-5 cursor-pointer border-fl-border data-[state=checked]:bg-fl-primary shadow-none"
          />
          {isHovered && (
            <button
              onClick={() => onOpen(item)}
              className="cursor-pointer flex gap-2 hover:text-fl-primary text-xs text-fl-text items-center p-2 border border-fl-border hover:bg-fl-hover rounded-md"
            >
              <SidebarIcon size={14} />
              Open
            </button>
          )}
        </div>

        {/* Data Fields */}
        {columns.map((col, idx) => (
          <div
            key={col.id}
            className="col-span-2 flex justify-between gap-2 items-center p-1"
          >
            <DataField column={col} item={item} />

            {idx === columns.length - 1 && (
              <div className="flex p-1 hover:bg-fl-hover rounded-md h-fit">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <DotsThreeVerticalIcon
                      size={18}
                      className="cursor-pointer text-fl-text"
                    />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="bg-fl-bg border border-fl-border text-fl-text">
                    <DropdownMenuItem onClick={() => onDelete(item)}>
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDuplicate(item)}>
                      Duplicate
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import type { ColumnType, ItemType, TableType } from "@/types/types";
import { Checkbox } from "@/components/ui/checkbox";
import { DataField } from "./DataField";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThreeVerticalIcon, MinusIcon } from "@phosphor-icons/react";
import { useDeleteItem } from "@/features/items/useDeleteItem";
import { useCreateItem } from "@/features/items/useCreateItem";
import { useState } from "react";
import BulkActionsBar from "./BulkActionBar";

interface TableProps {
  table: TableType;
  items: ItemType[];
  columns: ColumnType[];
}

const Table = ({ items, table, columns }: TableProps) => {
  const deleteItem = useDeleteItem();
  const createItem = useCreateItem();
  const [selected, setSelected] = useState<ItemType[]>([]);

  const toggleSelect = (item: ItemType) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((x) => x !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const handleBulkDelete = () => {
    for (let i = 0; i < selected.length; i++) {
      deleteItem.mutate(selected[i]);
      setSelected([]);
    }
  };

  const handleBulkDuplicate = () => {
    for (let i = 0; i < selected.length; i++) {
      handleDuplicate(selected[i]);
    }
  };

  const handleDuplicate = (item: ItemType) => {
    const newItem = {
      ...item,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(), // optional but recommended
      table_id: table.id, // ensure correct table
    };

    createItem.mutate(newItem);
  };

  return (
    <div className="flex flex-1 overflow-auto relative">
      <div className="custom-scrollbar flex flex-1 flex-col bg-fl-bg rounded-lg border border-fl-border text-fl-text overflow-auto relative">
        {/* Header */}
        <div className="px-8 sticky top-0 bg-fl-bg min-w-[1100px]">
          <div className="grid grid-cols-11 text-sm font-semibold text-fl-info pt-6 pb-4 border-b border-fl-border min-w-[900px]">
            {selected.length ? (
              <div
                onClick={() => setSelected([])}
                className="hover:border-gray-900 hover:dark:border-white border flex justify-center items-center w-5 h-5 rounded-md border-fl-border cursor-pointer text-fl-text"
              >
                <MinusIcon size={14} />
              </div>
            ) : (
              <div></div>
            )}
            {columns?.map((col) => (
              <div className="col-span-2" key={col.id}>
                {col.title}
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col min-w-[1100px] pb-16">
          {items?.map((item) => (
            <div
              key={item.id}
              className="px-8 hover:bg-fl-hover transition-colors"
            >
              <div className="grid grid-cols-11 items-center border-b border-fl-border text-sm">
                {/* Select */}
                <div className="">
                  <Checkbox
                    checked={selected.includes(item)}
                    onClick={() => toggleSelect(item)}
                    className="rounded-md w-5 h-5 text-white! cursor-pointer border-fl-border! data-[state=checked]:bg-fl-primary! shadow-none hover:border-gray-900! dark:hover:border-white!"
                  />
                </div>

                {columns?.map((col, key) => (
                  <div
                    className="col-span-2 flex justify-between gap-2 items-center"
                    key={key}
                  >
                    <DataField column={col} item={item} />
                    {key == columns.length - 1 && (
                      <div className="flex p-1 hover:bg-fl-hover rounded-md h-fit">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <DotsThreeVerticalIcon
                              size={18}
                              className="text-fl-text cursor-pointer"
                            />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-fl-bg border border-fl-border text-fl-text">
                            <DropdownMenuItem
                              onClick={() => deleteItem.mutate(item)}
                            >
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDuplicate(item)}
                            >
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
          ))}
          {items?.length == 0 && (
            <div className="text-fl-info flex flex-1 justify-center items-center my-12">
              No item found.
            </div>
          )}
        </div>
      </div>
      {selected.length > 0 && (
        <div className=" absolute m-3 left-0 right-0 bottom-0">
          <BulkActionsBar
            onClear={() => setSelected([])}
            count={selected.length}
            onDelete={handleBulkDelete}
            onDuplicate={handleBulkDuplicate}
          />
        </div>
      )}
    </div>
  );
};

export default Table;

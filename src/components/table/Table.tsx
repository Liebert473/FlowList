import type { ItemType, TableType } from "@/types/types";
import { Checkbox } from "@/components/ui/checkbox";
import { DataField } from "./DataField";
import { useColumns } from "@/features/columns/useColumns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import { useItems } from "@/features/items/useItems";
import { useDeleteItem } from "@/features/items/useDeleteItem";
import { useCreateItem } from "@/features/items/useCreateItem";

interface TableProps {
  table: TableType;
}

const Table = ({ table }: TableProps) => {
  const { data: columns } = useColumns(table.id);
  const { data: items } = useItems(table.id);
  const deleteItem = useDeleteItem();
  const createItem = useCreateItem();

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
    <div className="custom-scrollbar flex flex-1 flex-col bg-fl-bg rounded-lg border border-fl-border text-fl-text overflow-auto relative">
      {/* Header */}
      <div className="px-8 sticky top-0 bg-fl-bg min-w-[900px]">
        <div className="grid grid-cols-11 text-sm font-semibold text-fl-info pt-6 pb-4 border-b border-fl-border min-w-[900px]">
          <div></div>
          {columns?.map((col) => (
            <div className="col-span-2" key={col.id}>
              {col.title}
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col min-w-[900px]">
        {items?.map((item) => (
          <div
            key={item.id}
            className="px-8 hover:bg-fl-hover transition-colors"
          >
            <div className="grid grid-cols-11 items-center border-b border-fl-border text-sm">
              {/* Select */}
              <div className="">
                <Checkbox className=" w-5 h-5 text-white! cursor-pointer border-fl-border! data-[state=checked]:bg-fl-primary! shadow-none hover:border-gray-900! dark:hover:border-white!" />
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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
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
      </div>
    </div>
  );
};

export default Table;

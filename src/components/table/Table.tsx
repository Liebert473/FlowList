import type { ColumnType, ItemType, TableType } from "@/types/types";
import { ItemRow } from "./item/ItemRow";
import { MinusIcon } from "@phosphor-icons/react";
import { useDeleteItem } from "@/features/items/useDeleteItem";
import { useCreateItem } from "@/features/items/useCreateItem";
import { useState } from "react";
import BulkActionsBar from "./BulkActionBar";
import { Skeleton } from "../ui/skeleton";
import { Fragment } from "react";

interface TableProps {
  table: TableType | undefined;
  items: ItemType[];
  columns: ColumnType[];
  viewItem: (item: ItemType) => void;
}

const Table = ({ items, table, columns, viewItem }: TableProps) => {
  const deleteItem = useDeleteItem();
  const createItem = useCreateItem();
  const [selected, setSelected] = useState<ItemType[]>([]);
  const rows = Array.from({ length: 6 });

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
    if (table) {
      const newItem = {
        ...item,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(), // optional but recommended
        table_id: table?.id, // ensure correct table
      };

      createItem.mutate(newItem);
    }
  };

  return (
    <div className="flex flex-1 overflow-auto relative">
      <div className="custom-scrollbar flex flex-1 flex-col bg-fl-bg rounded-lg border border-fl-border text-fl-text overflow-auto relative">
        {/* Header */}
        <div className="px-8 sticky top-0 bg-fl-bg min-w-[1100px]">
          <div
            className="grid text-sm font-semibold text-fl-info pt-6 pb-4 border-b border-fl-border min-w-[900px]"
            style={{
              gridTemplateColumns: `repeat(${
                !table || columns.length === 0 ? 11 : columns.length * 2 + 1
              }, minmax(0, 1fr))`,
            }}
          >
            {!table || columns.length === 0 ? (
              <ColumnsSkeleton />
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col min-w-[1100px] pb-16">
          {!table || columns.length === 0 ? (
            rows.map((_, index) => (
              <Fragment key={`skeleton-wrapper-${index}`}>
                <ItemSkeleton />
              </Fragment>
            ))
          ) : (
            <>
              {items?.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  columns={columns}
                  isSelected={selected.includes(item)}
                  onToggleSelect={toggleSelect}
                  onOpen={viewItem}
                  onDelete={(i) => deleteItem.mutate(i)}
                  onDuplicate={handleDuplicate}
                />
              ))}
              {items?.length == 0 && (
                <div className="text-fl-info flex flex-1 justify-center items-center my-12">
                  No item found.
                </div>
              )}
            </>
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

const ColumnsSkeleton = () => {
  return (
    <>
      <Skeleton className="w-4 h-4 rounded-md" />
      <Skeleton className="h-4 col-span-2 w-[90%]" />
      <Skeleton className="h-4 col-span-2 w-[90%]" />
      <Skeleton className="h-4 col-span-2 w-[90%]" />
      <Skeleton className="h-4 col-span-2 w-[90%]" />
      <Skeleton className="h-4 col-span-2 w-[90%]" />
    </>
  );
};

const ItemSkeleton = () => {
  return (
    <div className="grid grid-cols-11 mx-8 py-4 items-center border-b border-fl-border dark:border-fl-border">
      {/* Checkbox */}
      <Skeleton className="w-4 h-4 rounded-md col-span-1 items-center" />

      {/* Title */}
      <Skeleton className="h-4 w-[90%] col-span-2 items-center" />

      {/* Status */}
      <div className="col-span-2 flex gap-2 items-center">
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>

      {/* Priority */}
      <div className="col-span-2 flex gap-2">
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>

      {/* Category (multiple tags) */}
      <div className="col-span-2 flex gap-2">
        <Skeleton className="h-5 w-12 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
        <Skeleton className="h-5 w-10 rounded-full" />
      </div>

      {/* Date */}
      <div className="col-span-2 flex items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-5 rounded-md" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div>
          <Skeleton className="h-5 w-5 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default Table;

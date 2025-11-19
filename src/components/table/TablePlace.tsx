import { type ItemType, type TableType } from "@/types/types";
import TableHeader from "@/components/table/TableHeader";
import Table from "@/components/table/Table";
import { useState } from "react";

interface TablePlaceProps {
  table: TableType;
}

export const TablePlace = ({ table }: TablePlaceProps) => {
  const [items, setItems] = useState<ItemType[]>([]);

  const isOrderEqual = (prev: ItemType[], next: ItemType[]) => {
    if (prev === next) return true;

    if (prev.length !== next.length) return false;

    for (let i = 0; i < prev.length; i++) {
      if (prev[i].id !== next[i].id) {
        return false;
      }
    }

    return true;
  };

  const handleItemChange = (newItems: ItemType[]) => {
    if (!isOrderEqual(items, newItems)) {
      setItems(newItems);
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <TableHeader table={table} onItemChange={handleItemChange} />
      <div className="py-6 px-8 flex flex-1 overflow-auto">
        <Table items={items} table={table} />
      </div>
    </div>
  );
};

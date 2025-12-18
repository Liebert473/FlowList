import { useUpdateItem } from "@/features/items/useUpdateItem";
import type { ColumnType, ItemType } from "@/types/types";
import DebouncedInput from "./input/DebouncedInput";
import { DatePicker } from "./input/DatePicker";
import { MultiChoiceDropdown } from "./input/MultiChoice";
import { ChoiceDropdown } from "./input/Choice";

interface DataFieldProps {
  column: ColumnType;
  item: ItemType;
}

export const DataField = ({ column, item }: DataFieldProps) => {
  const updateItem = useUpdateItem();

  const handelChanges = (changes: any) => {
    updateItem.mutate({
      id: item.id,
      table_id: item.table_id,
      update: {
        data: { ...item.data, [column.id]: changes },
      },
    });
  };
  return (
    <div className="flex hover:bg-fl-bg hover:outline hover:outline-fl-primary rounded-md h-12 px-2 cursor-pointer transition flex-1 overflow-hidden">
      {"multiChoice" == column.type ? (
        <MultiChoiceDropdown
          column={column}
          selectedValues={item.data[column.id] || []}
          onChange={handelChanges}
        />
      ) : "choice" == column.type ? (
        <ChoiceDropdown
          column={column}
          selectedValues={item.data[column.id] || []}
          onChange={handelChanges}
        />
      ) : column.type == "date" ? (
        <DatePicker value={item.data[column.id]} onChange={handelChanges} />
      ) : (
        <DebouncedInput
          initialVal={item.data[column.id]}
          onChange={handelChanges}
        />
      )}
    </div>
  );
};

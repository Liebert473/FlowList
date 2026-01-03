import type { ColumnType, ItemType } from "@/types/types";
import { DateView } from "./DateView";
import { ChoiceViewDropdown } from "./ChoiceView";
import { RelationViewDropdown } from "./RelationView";

interface ViewFieldProps {
  column: ColumnType;
  item: ItemType;
}

export const ViewField = ({ column, item }: ViewFieldProps) => {
  return (
    <div className="flex hover:bg-fl-bg hover:outline hover:outline-fl-primary rounded-md h-12 px-2 cursor-pointer transition flex-1 overflow-hidden">
      {"multiChoice" == column.type || "choice" == column.type ? (
        <ChoiceViewDropdown
          column={column}
          selectedValues={item.data[column.id] || []}
        />
      ) : "relation" == column.type ? (
        <RelationViewDropdown
          column={column}
          selectedItems={item.data[column.id] || []}
        />
      ) : (
        <DateView value={item.data[column.id]} />
      )}
    </div>
  );
};

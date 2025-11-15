import TableHeader from "@/components/table/TableHeader";
import Table from "@/components/table/Table";
import { useTable } from "@/contexts/table_data/TableContext";
export const TasksPage = () => {
  const { tables } = useTable();
  console.log(tables);
  const tableIndex = tables.findIndex((tb) => tb.title == "My Tasks");
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <TableHeader tableData={tables[tableIndex]} />
      <div className="py-6 px-8 flex flex-1 overflow-auto">
        <Table />
      </div>
    </div>
  );
};

import TableHeader from "@/components/table/TableHeader";
import Table from "@/components/table/Table";
import { useTables } from "@/features/tables/useTables";
import { useState } from "react";
export const TasksPage = () => {
  const { data: tables, isLoading } = useTables();
  const [search, setSearch] = useState("");
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      {!isLoading && tables && (
        <TableHeader
          search={search}
          onSearch={setSearch}
          tableData={tables[0]}
        />
      )}
      <div className="py-6 px-8 flex flex-1 overflow-auto">
        {!isLoading && tables && <Table search={search} table={tables[0]} />}
      </div>
    </div>
  );
};

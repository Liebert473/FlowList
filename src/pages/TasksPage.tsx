import { TablePlace } from "@/components/table/TablePlace";
import { useTables } from "@/features/tables/useTables";
export const TasksPage = () => {
  const { data: tables } = useTables();

  return <>{tables && <TablePlace table={tables[0]} />}</>;
};

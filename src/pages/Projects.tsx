import { NotFound } from "@/components/common/NotFound";
import { TablePlace } from "@/components/table/TablePlace";
import { useTables } from "@/features/tables/useTables";

export const Projects = () => {
  const { data: tables, isLoading } = useTables();
  const currentTable = tables?.filter((t) => t.title == "Projects")[0];
  return (
    <>
      {currentTable || isLoading ? (
        <TablePlace table={currentTable} />
      ) : (
        <NotFound message="Table Not Found." />
      )}
    </>
  );
};

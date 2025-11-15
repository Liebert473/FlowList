import { TableProvider } from "./TableContext";
import { ItemProvider } from "./ItemContext";
import { ColumnProvider } from "./ColumnContext";
import { ValueProvider } from "./ValueContext";

export const TableDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <TableProvider>
      <ColumnProvider>
        <ItemProvider>
          <ValueProvider>{children}</ValueProvider>
        </ItemProvider>
      </ColumnProvider>
    </TableProvider>
  );
};

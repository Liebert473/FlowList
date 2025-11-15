import { useContext, createContext, useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import type { TableType } from "@/types/types";
import { useAuth } from "../AuthContext";

type TableContextType = {
  tables: TableType[];
};

const TableContext = createContext<TableContextType | null>(null);

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [tables, setTables] = useState<TableType[]>([]);

  const fetchTables = async () => {
    const { data, error } = await supabase
      .from("tables")
      .select("*")
      .eq("user_id", user.id);
    if (error) throw error;
    setTables(data);
  };

  useEffect(() => {
    if (user) fetchTables();
  }, []);
  return (
    <TableContext.Provider value={{ tables }}>{children}</TableContext.Provider>
  );
};

export const useTable = (): TableContextType => {
  const context = useContext(TableContext);
  if (!context) {
    throw Error("TableContext must use within the provider.");
  }
  return context;
};

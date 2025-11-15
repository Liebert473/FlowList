import { useContext, createContext, useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import type { ColumnType } from "@/types/types";
import { useAuth } from "../AuthContext";

type ColumnContextType = {
  columns: ColumnType[];
  updateColumn: (
    columnId: string,
    update: Partial<ColumnType>,
    index?: number
  ) => Promise<void>;
};

const ColumnContext = createContext<ColumnContextType | null>(null);

export const ColumnProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [columns, setColumns] = useState<ColumnType[]>([]);

  const fetchColumns = async () => {
    const { data, error } = await supabase
      .from("columns")
      .select("*")
      .eq("user_id", user.id);
    if (error) throw error;
    setColumns(data);
  };

  const updateColumn = async (
    columnId: string,
    update: Partial<ColumnType>,
    index?: number
  ) => {
    let targetIndex = index ?? columns.findIndex((col) => col.id === columnId);

    if (targetIndex >= 0) {
      setColumns((prev) => {
        const updated = [...prev];
        updated[targetIndex] = { ...updated[targetIndex], ...update };
        return updated;
      });
    }

    const { error } = await supabase
      .from("columns")
      .update(update)
      .eq("id", columnId);

    if (error) throw error;
    fetchColumns();
  };

  useEffect(() => {
    if (user) fetchColumns();
  }, []);

  return (
    <ColumnContext.Provider value={{ columns, updateColumn }}>
      {children}
    </ColumnContext.Provider>
  );
};

export const useColumn = (): ColumnContextType => {
  const context = useContext(ColumnContext);
  if (!context) {
    throw Error("ColumnContext must use within the provider.");
  }
  return context;
};

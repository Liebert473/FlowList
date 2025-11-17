import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ColumnType } from "@/types/types";
import { useAuth } from "@/contexts/AuthContext";

export function useColumns(tableId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["columns", tableId],

    enabled: Boolean(tableId && user?.id), // prevent early/invalid fetch

    queryFn: async (): Promise<ColumnType[]> => {
      const { data, error } = await supabase
        .from("columns")
        .select("*")
        .eq("table_id", tableId)
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data ?? [];
    },
  });
}

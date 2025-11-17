import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { TableType } from "@/types/types";
import { useAuth } from "@/contexts/AuthContext";

export function useTables() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["tables"],

    enabled: Boolean(user?.id), // prevent early/invalid fetch

    queryFn: async (): Promise<TableType[]> => {
      const { data, error } = await supabase
        .from("tables")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data ?? [];
    },
  });
}

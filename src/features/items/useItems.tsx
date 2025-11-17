import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ItemType } from "@/types/types";
import { useAuth } from "@/contexts/AuthContext";

export function useItems(tableId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["items", tableId],

    enabled: Boolean(tableId && user?.id), // prevent early/invalid fetch

    queryFn: async (): Promise<ItemType[]> => {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("user_id", user.id)
        .eq("table_id", tableId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data ?? [];
    },
  });
}

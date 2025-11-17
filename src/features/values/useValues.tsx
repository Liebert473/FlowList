import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ValueType } from "@/types/types";
import { useAuth } from "@/contexts/AuthContext";

export function useValues(columnId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["values", columnId],

    enabled: Boolean(columnId && user?.id), // prevent early/invalid fetch

    queryFn: async (): Promise<ValueType[]> => {
      const { data, error } = await supabase
        .from("values")
        .select("*")
        .eq("column_id", columnId)
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data ?? [];
    },
  });
}

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ItemType } from "@/types/types";
import { useAuth } from "@/contexts/AuthContext";

export function useCreateItem() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      table_id,
      ...payload
    }: { table_id: string } & Partial<ItemType>) => {
      const { data, error } = await supabase
        .from("items")
        .insert({
          ...payload,
          table_id,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    onMutate: async ({
      table_id,
      ...payload
    }: { table_id: string } & Partial<ItemType>) => {
      queryClient.cancelQueries({ queryKey: ["items", table_id] });

      const previous = queryClient.getQueryData<ItemType[]>([
        "items",
        table_id,
      ]);

      queryClient.setQueryData(
        ["items", table_id],
        (old: ItemType[] | undefined = []) => [
          ...old,
          {
            ...payload,
            table_id,
            user_id: user.id,
          },
        ]
      );

      return { previous };
    },

    onError(_e, vars, cxt) {
      queryClient.setQueryData(["items", vars.table_id], cxt?.previous);
    },

    onSettled: (_d, _e, vars) => {
      queryClient.invalidateQueries({ queryKey: ["items", vars.table_id] });
    },
  });
}

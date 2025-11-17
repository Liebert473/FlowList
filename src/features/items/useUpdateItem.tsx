import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ItemType } from "@/types/types";

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      table_id,
      update,
    }: {
      id: string;
      table_id: string;
      update: Partial<ItemType>;
    }) => {
      const { data, error } = await supabase
        .from("items")
        .update(update)
        .eq("id", id)
        .eq("table_id", table_id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    onMutate: async ({ id, table_id, update }) => {
      await queryClient.cancelQueries({ queryKey: ["items", table_id] });

      const previous = queryClient.getQueryData<ItemType[]>([
        "items",
        table_id,
      ]);

      queryClient.setQueryData(
        ["items", table_id],
        (old: ItemType[] | undefined = []) =>
          old.map((i) => (i.id === id ? { ...i, ...update } : i))
      );

      return { previous };
    },

    onError(_e, vars, ctx) {
      queryClient.setQueryData(["items", vars.table_id], ctx?.previous);
    },

    onSettled: (_d, _e, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["items", vars.table_id],
      });
    },
  });
}

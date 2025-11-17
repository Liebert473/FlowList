import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ItemType } from "@/types/types";

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: ItemType) => {
      const { error } = await supabase.from("items").delete().eq("id", item.id);

      if (error) throw error;
      return item;
    },
    onMutate: async (item: ItemType) => {
      await queryClient.cancelQueries({ queryKey: ["items", item.table_id] });

      const previous = queryClient.getQueryData<ItemType[]>([
        "items",
        item.table_id,
      ]);

      queryClient.setQueryData(
        ["items", item.table_id],
        (old: ItemType[] | undefined = []) =>
          old.filter((i) => i.id !== item.id)
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

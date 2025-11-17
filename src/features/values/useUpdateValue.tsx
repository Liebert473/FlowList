import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ValueType } from "@/types/types";

export function useUpdateValue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      column_id,
      update,
    }: {
      id: string;
      column_id: string;
      update: Partial<ValueType>;
    }) => {
      const { data, error } = await supabase
        .from("values")
        .update(update)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    onMutate: async ({ id, column_id, update }) => {
      await queryClient.cancelQueries({ queryKey: ["values", column_id] });

      const previous = queryClient.getQueryData<ValueType[]>([
        "values",
        column_id,
      ]);

      queryClient.setQueryData(
        ["values", column_id],
        (old: ValueType[] | undefined = []) =>
          old.map((i) => (i.id === id ? { ...i, ...update } : i))
      );

      return { previous };
    },

    onError(_e, vars, ctx) {
      queryClient.setQueryData(["values", vars.column_id], ctx?.previous);
    },

    onSettled: (_d, _e, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["values", vars.column_id],
      });
    },
  });
}

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ValueType } from "@/types/types";

export function useDeleteValue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: ValueType) => {
      const { error } = await supabase
        .from("values")
        .delete()
        .eq("id", value.id);

      if (error) throw error;
      return value;
    },
    onMutate: async (value: ValueType) => {
      await queryClient.cancelQueries({
        queryKey: ["values", value.column_id],
      });

      const previous = queryClient.getQueryData<ValueType[]>([
        "values",
        value.column_id,
      ]);

      queryClient.setQueryData(
        ["values", value.column_id],
        (old: ValueType[] | undefined = []) =>
          old.filter((i) => i.id !== value.id)
      );

      return { previous };
    },

    onError(_e, vars, cxt) {
      queryClient.setQueryData(["values", vars.column_id], cxt?.previous);
    },

    onSettled: (_d, _e, vars) => {
      queryClient.invalidateQueries({ queryKey: ["values", vars.column_id] });
    },
  });
}

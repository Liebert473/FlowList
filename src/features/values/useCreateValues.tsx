import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ValueType } from "@/types/types";
import { useAuth } from "@/contexts/AuthContext";

export function useCreateValue() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      column_id,
      ...payload
    }: { column_id: string } & Partial<ValueType>) => {
      const { data, error } = await supabase
        .from("values")
        .insert({
          ...payload,
          column_id,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    onMutate: async ({
      column_id,
      ...payload
    }: { column_id: string } & Partial<ValueType>) => {
      queryClient.cancelQueries({ queryKey: ["values", column_id] });

      const previous = queryClient.getQueryData<ValueType[]>([
        "values",
        column_id,
      ]);

      queryClient.setQueryData(
        ["values", column_id],
        (old: ValueType[] | undefined = []) => [
          ...old,
          {
            ...payload,
            column_id,
            user_id: user.id,
          },
        ]
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

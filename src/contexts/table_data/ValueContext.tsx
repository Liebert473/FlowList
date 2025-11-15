import { useContext, createContext, useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import type { ValueType } from "@/types/types";
import { useAuth } from "../AuthContext";

type ValueContextType = {
  values: ValueType[];
  updateValue: (
    valueId: string,
    updates: Partial<ValueType>,
    index?: number
  ) => Promise<void>;
  deleteValue: (valueId: string, index?: number) => Promise<void>;
  insertValue: (data: Partial<ValueType>) => Promise<void>;
};

const ValueContext = createContext<ValueContextType | null>(null);

export const ValueProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [values, setValues] = useState<ValueType[]>([]);

  const fetchValues = async () => {
    const { data, error } = await supabase
      .from("values")
      .select("*")
      .eq("user_id", user.id);
    if (error) throw error;
    setValues(data);
  };

  const updateValue = async (
    valueId: string,
    update: Partial<ValueType>,
    index?: number
  ) => {
    let targetIndex = index ?? values.findIndex((col) => col.id === valueId);

    if (targetIndex >= 0) {
      setValues((prev) => {
        const updated = [...prev];
        updated[targetIndex] = { ...updated[targetIndex], ...update };
        return updated;
      });
    }

    const { error } = await supabase
      .from("values")
      .update(update)
      .eq("id", valueId);

    if (error) throw error;
    fetchValues();
  };

  const deleteValue = async (valueId: string, index?: number) => {
    let targetIndex = index ?? values.findIndex((val) => val.id === valueId);

    if (targetIndex >= 0) {
      setValues((prev) => {
        const updated = [...prev].splice(targetIndex, 1);
        return updated;
      });
    }

    const { error } = await supabase.from("values").delete().eq("id", valueId);

    if (error) throw error;
    fetchValues();
  };

  const insertValue = async (data: Partial<ValueType>) => {
    const newItem: ValueType = {
      ...data,
      id: crypto.randomUUID(),
      user_id: user.id,
      created_at: new Date().toISOString(),
    } as ValueType;

    setValues((prev) => [...prev, newItem]);

    const { error } = await supabase.from("values").insert(newItem);

    if (error) throw error;
    fetchValues();
  };

  useEffect(() => {
    if (user) fetchValues();
  }, []);

  return (
    <ValueContext.Provider
      value={{ values, updateValue, deleteValue, insertValue }}
    >
      {children}
    </ValueContext.Provider>
  );
};

export const useValue = (): ValueContextType => {
  const context = useContext(ValueContext);
  if (!context) {
    throw Error("ValueContext must use within the provider.");
  }
  return context;
};

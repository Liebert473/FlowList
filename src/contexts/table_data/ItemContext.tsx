import { useContext, createContext, useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import type { ItemType } from "@/types/types";
import { useAuth } from "../AuthContext";

type ItemContextType = {
  items: ItemType[];
  updateItem: (
    itemId: string,
    updates: Partial<ItemType>,
    index?: number
  ) => Promise<void>;
  deleteItem: (itemId: string, index?: number) => Promise<void>;
  insertItem: (data: Partial<ItemType>) => Promise<void>;
};

const ItemContext = createContext<ItemContextType | null>(null);

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<ItemType[]>([]);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("user_id", user.id);
    if (error) throw error;
    setItems(data);
  };

  const updateItem = async (
    itemId: string,
    update: Partial<ItemType>,
    index?: number
  ) => {
    let targetIndex = index ?? items.findIndex((col) => col.id === itemId);

    if (targetIndex >= 0) {
      setItems((prev) => {
        const updated = [...prev];
        updated[targetIndex] = { ...updated[targetIndex], ...update };
        return updated;
      });
    }

    const { error } = await supabase
      .from("items")
      .update(update)
      .eq("id", itemId);

    if (error) throw error;
    fetchItems();
  };

  const deleteItem = async (itemId: string, index?: number) => {
    let targetIndex = index ?? items.findIndex((col) => col.id === itemId);

    if (targetIndex >= 0) {
      setItems((prev) => {
        const updated = [...prev].splice(targetIndex, 1);
        return updated;
      });
    }

    const { error } = await supabase.from("items").delete().eq("id", itemId);

    if (error) throw error;
    fetchItems();
  };

  const insertItem = async (data: Partial<ItemType>) => {
    const newItem: ItemType = {
      ...data,
      id: crypto.randomUUID(),
      user_id: user.id,
      created_at: new Date().toISOString(),
    } as ItemType;

    setItems((prev) => [...prev, newItem]);

    const { error } = await supabase.from("items").insert(newItem);

    if (error) throw error;
    fetchItems();
  };

  useEffect(() => {
    if (user) fetchItems();
  }, []);

  return (
    <ItemContext.Provider value={{ items, updateItem, deleteItem, insertItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItem = (): ItemContextType => {
  const context = useContext(ItemContext);
  if (!context) {
    throw Error("ItemContext must use within the provider.");
  }
  return context;
};

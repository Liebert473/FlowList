import { createClient } from "@supabase/supabase-js";
import type { ProfileType } from "@/types/types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getUserProfile(userId: string) {
    const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single<ProfileType>();

    if (error) throw error
    return data
}
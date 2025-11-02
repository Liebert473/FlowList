import { supabase } from "./supabase";

export const signUp = async (email : string, password : string) => {
    const {data, error} = await supabase.auth.signUp({email, password, options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`}})
    if (error) throw error
    return data
}

export const signIn = async (email: string, password: string) => {
    const {data, error} = await supabase.auth.signInWithPassword({email, password})
    if (error) throw error
    return data
}

export const logOut = async () => {
    const {error} = await supabase.auth.signOut()
    if (error) throw error
}

export const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      },
    });
    if (error) throw error;
  };
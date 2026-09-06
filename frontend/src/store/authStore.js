import { create } from "zustand";
import { supabase } from "../services/supabase";

export const useAuthStore = create((set) => ({
  user: null,

  loginWithGoogle: async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/dashboard",
        queryParams: {
          prompt: "select_account",
        },
      },
    });
  },

  signInWithEmail: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  signUpWithEmail: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  logout: async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  },

  setUser: (user) => set({ user }),
}));

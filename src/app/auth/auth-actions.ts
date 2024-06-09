"use server";

import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
export const signOut = async () => {
  const supabase = createServerClient();
  await supabase.auth.signOut();
  return redirect("/login");
};
export const googleSignIn = async () => {
  const supabase = createServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    // provider: "google",
    provider: "google",
    options: {
      // redirectTo: "/",
      // queryParams: {
      //   access_type: "offline",
      //   prompt: "consent",
      // },
    },
  });
  if (error) {
    console.log("error");
  }
};


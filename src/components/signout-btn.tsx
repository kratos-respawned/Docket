"use client";
import { useSupabaseClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
export const SignOutBtn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = useSupabaseClient();
  async function signOut() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    if (error) {
      console.error("Error signing out", error);
    }
    router.push("/login");
  }

  return (
    <Button disabled={loading} onClick={signOut}>
      {loading ? "Signing out..." : "Sign out"}
    </Button>
  );
};

import { redirect } from "next/navigation";
import { createServerClient } from "./supabase/server";


export const authRedirect = async () => {
  const supabase = createServerClient();
  const { data: session, error: authError } = await supabase.auth.getUser();
  if (!session.user) {
    redirect("/login");
  }
};


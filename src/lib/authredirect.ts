import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const authRedirect = async () => {
  // const supabase = createServerClient();
  // const { data: session, error: authError } = await supabase.auth.getUser();
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }
};

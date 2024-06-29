import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const session = await auth();
  if (session && session.user) {
    redirect("/");
  } else {
    redirect("/auth/login");
  }
}

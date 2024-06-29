"use client";
import { logout } from "@/lib/auth/actions/logout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
export const SignOutBtn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  async function signOut() {
    setLoading(true);
    await logout();
    router.push("/login");
  }

  return (
    <Button disabled={loading} onClick={signOut}>
      {loading ? "Signing out..." : "Sign out"}
    </Button>
  );
};

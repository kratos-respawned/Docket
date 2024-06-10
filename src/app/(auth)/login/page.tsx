import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ReaderIcon } from "@radix-ui/react-icons";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = {
  title: "Sign In - Docket",
  description:
    " Sign in to your Docket account to access your projects and tasks.",
};

export default async function AuthenticationPage() {
  const supabase = createServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (data.user) {
    console.log(data.user?.id);
    redirect("/");
  }
  return (
    <div className="lg:p-8">
      <Link
        href="/signup"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Sign Up
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Log in to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to log in to your account
          </p>
        </div>
        <SignInForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

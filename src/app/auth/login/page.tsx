import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

import { auth } from "@/auth";
import { SignInForm } from "@/components/auth/sign-in-form";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In ",
  description:
    " Sign in to your Docket account to access your saved trips, reviews, and more.",
};

export default async function AuthenticationPage() {
  const session = await auth();
  if (session && session.user) {
    redirect("/");
  }
  return (
    <div className="lg:p-8">
      <Link
        href="/auth/register"
        className={cn(
          buttonVariants({ variant: "link" }),
          "absolute text-foreground hover:text-primary right-4 top-4 md:right-8 md:top-8"
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

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { ResetPasswordForm } from "@/components/auth/password-form";
import { ResetPasswordMailForm } from "@/components/auth/reset-password-email-form";

export const metadata: Metadata = {
  title: "Reset Password ",
  description:
    " Reset your Trekyaari account password to access your saved trips, reviews, and more.",
};

export default async function PasswordResetPage({
  _,
  searchParams,
}: {
  _: never;
  searchParams: { token: string | undefined };
}) {
  const session = await auth();
  if (session && session.user) {
    redirect("/");
  }
  return (
    <div className="lg:p-8 place-self-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "link" }),
          "absolute text-foreground hover:text-primary right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Home
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset Password
          </h1>
          <p className="text-sm text-muted-foreground">
            {searchParams.token
              ? "Enter your new password below"
              : "Forgot your password? No worries! Enter your email address below to reset your password."}
          </p>
        </div>
        {searchParams.token ? (
          <ResetPasswordForm token={searchParams.token} />
        ) : (
          <ResetPasswordMailForm />
        )}
      </div>
    </div>
  );
}

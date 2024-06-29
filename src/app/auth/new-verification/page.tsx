import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import { newVerification } from "@/lib/auth/actions/new-verification";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

import { notFound, redirect } from "next/navigation";



export const metadata: Metadata = {
  title: "Email Verification ",
  description:
    " Verify your email address to access your account. If you haven't received an email, please check your spam folder.",
};

export default async function VerificationPage({
  _,
  searchParams,
}: {
  _: never;
  searchParams: { token: string | undefined };
}) {
  const session = await auth();
  if (session && session.user) redirect("/");
  const token = searchParams.token;
  if (!token) notFound();
  const { error } = await newVerification(token);
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
            {error ? "Email Verification Failed" : "Email Verified"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {error
              ? `Verification failed: ${error}`
              : "Your account has been verified. You can now login to your account."}
          </p>
          <Link
            href={"/auth/login"}
            className="underline underline-offset-4 hover:text-primary"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable react/no-unescaped-entities */
import { ReaderIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container relative min-h-dvh flex flex-1 flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <Link href="/" passHref>
          <div className="relative z-20 flex gap-2 items-center text-lg font-medium">
            <ReaderIcon className=" h-6 w-6" />
            Docket Inc
          </div>
        </Link>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Docket is the best project management tool I&apos;ve ever used. It&apos;s
              simple, easy to use, and incredibly powerful."
            </p>
            <footer className="text-sm">Pallab Sonowal</footer>
          </blockquote>
        </div>
      </div>
      {children}
    </main>
  );
}

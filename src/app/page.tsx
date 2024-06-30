import { Navbar } from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { ArrowRightIcon, Blocks } from "lucide-react";

import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-1 container">
        <section
          className={
            " mx-auto flex max-w-[980px] flex-col items-center gap-5 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20"
          }
        >
          <a
            href="https://github.com/kratos-respawned/Docket"
            className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
          >
            <Blocks className="h-4 w-4" />{" "}
            <Separator className="mx-2 h-4" orientation="vertical" />{" "}
            <span>Introducing Docket 2.0</span>
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </a>
          <div className="grid gap-3">
            <h1 className="text-center animate-in font-heading text-2xl sm:text-3xl font-bold leading-tight  mx-auto md:text-5xl lg:leading-[1.1]">
              Your Personal Note Taking App
            </h1>
            <p className="max-w-[750px] text-center text-base sm:text-lg font-light text-foreground text-balance">
              Docket is a simple note taking app that helps you stay organized
              and focused.
            </p>
            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
              <Link href="/dashboard" className={cn(buttonVariants())}>
                Get Started
              </Link>
              <a
                target="_blank"
                rel="noreferrer"
                href={"https://github.com/kratos-respawned/Docket"}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                <SiGithub className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}

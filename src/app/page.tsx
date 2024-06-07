import { Navbar } from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, Blocks, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-1">
        <section
          className={
            "mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20"
          }
        >
          <Link
            href="/docs/changelog"
            className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
          >
            <Blocks className="h-4 w-4" />{" "}
            <Separator className="mx-2 h-4" orientation="vertical" />{" "}
            <span>Introducing Docket 2.0</span>
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
          <h1 className="text-center font-heading text-3xl font-bold leading-tight  mx-auto md:text-5xl lg:leading-[1.1]">
            Your Personal Note Taking App
          </h1>
          <p className="max-w-[750px] text-center text-lg font-light text-foreground text-balance">
            Docket is a simple note taking app that helps you stay organized and
            focused.
          </p>
          <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
            <Link href="/" className={cn(buttonVariants())}>
              Get Started
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={"/"}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
{
  /* <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
<div className="container px-8 md:px-10">
  <div className="flex flex-col items-center justify-center space-y-4 text-center">
    <div className="space-y-2">
      <h2 className="text-3xl font-heading font-bold  sm:text-4xl md:text-5xl">
        Popular Trekking Destinations
      </h2>
      <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
        Explore the most breathtaking landscapes and challenge
        yourself on unforgettable treks.
      </p>
    </div>
  </div>
  <div className="px-8 md:px-10 mt-8"></div>
</div>
</section> */
}

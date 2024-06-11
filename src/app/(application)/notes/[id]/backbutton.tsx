"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export const Backbutton = () => {
  const router = useRouter();
  return (
    <Button variant={"ghost"} className="gap-2 px-2" onClick={() => router.back()}>
      <ChevronLeft className="w-5 h-5" />
      Back
    </Button>
  );
};

"use client";

import { newNoteAction } from "@/app/(application)/actions/noteActions";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const NewNoteBtn = ({
  notebookId,
  className,
}: {
  notebookId: string;
  className?: string;
}) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const createNote = async () => {
    startTransition(async () => {
      const { success, data, error } = await newNoteAction(notebookId);
      if (error) {
        toast.error("Error", { description: error });
        return;
      }
      toast.success("Success", { description: success });
      router.push(`/editor/${data}`);
    });
  };
  return (
    <Button onClick={createNote} disabled={loading} className={cn(className)}>
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin mr-2" /> Cooking
        </>
      ) : (
        "New Note"
      )}
    </Button>
  );
};

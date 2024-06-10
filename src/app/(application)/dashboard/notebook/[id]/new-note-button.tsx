"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { revalidate } from "../../note-actions";

export const NewNoteBtn = ({
  notebookId,
  className,
}: {
  notebookId: string;
  className?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const createNote = async () => {
    const supabase = createClient();
    setLoading(true);
    try {
      const { data: session, error } = await supabase.auth.getUser();
      if (error || !session) throw new Error("Invalid User");
      const { data, error: noteError } = await supabase
        .from("notes")
        .insert({
          notebookid: notebookId,
          title: "Untitled",
          userid: session.user.id,
        })
        .select(`id`)
        .single();
      if (noteError) throw new Error("Failed to create note");
      await revalidate(notebookId);
      router.push(`/editor/${data.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button onClick={createNote} disabled={loading} className={cn(className)}>
      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "New Note"}
    </Button>
  );
};

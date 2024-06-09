"use client";

import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createNewNote } from "@/app/(application)/dashboard/note-actions";
export const EmptyNotes = ({ notebookId }: { notebookId: string }) => {
  const [loading, setLoading] = useState(false);
  const createNote = async () => {
    setLoading(true);
    try {
      await createNewNote(notebookId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" absolute inset-0 flex items-center justify-center ">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
          No notes found
        </h2>
        <p className="mt-1 mb-2 text-sm text-gray-500 dark:text-gray-400">
          Create a new note to get started
        </p>
        <form action={createNote}>
          <Button disabled={loading} variant="outline">
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "New Note"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

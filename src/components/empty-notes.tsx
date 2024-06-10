"use client";
import { NewNoteBtn } from "@/app/(application)/dashboard/notebook/[id]/new-note-button";
export const EmptyNotes = ({ notebookId }: { notebookId: string }) => {
  return (
    <div className=" absolute inset-0 flex items-center justify-center ">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
          No notes found
        </h2>
        <p className="mt-1 mb-2 text-sm text-gray-500 dark:text-gray-400">
          Create a new note to get started
        </p>
        <NewNoteBtn notebookId={notebookId} />
      </div>
    </div>
  );
};

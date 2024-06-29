"use client";
import { NewNotebookBtn } from "@/app/(application)/dashboard/new-notebook-button";
export const EmptyNotebook = () => {
  return (
    <div className=" absolute inset-0 flex items-center justify-center ">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
          No notebook found
        </h2>
        <p className="mt-1 mb-2 text-sm text-gray-500 dark:text-gray-400">
          Create a notebook to get started
        </p>
        <NewNotebookBtn />
      </div>
    </div>
  );
};

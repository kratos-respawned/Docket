"use client";
import { Note as NoteType } from "@/typings/note";
import Note from "./Note";
import useSWR from "swr";
import fetchNotes from "@/lib/fetchNotes";
function NotesSection() {
  const {
    data: notes,
    isLoading,
    isValidating,
  } = useSWR("/api/getNotes", fetchNotes, {
    revalidateOnFocus: false,
  });
  return (
    <section className=" w-full flex flex-wrap gap-6 mt-10 ">
      {!notes || notes.length === 0 ? (
        <h1 className="mt-10 text-2xl font-montserrat">No notes found</h1>
      ) : (
        notes.map((note: NoteType) => {
          return (
            <Note
              key={note.id}
              id={note.id}
              content={note.content}
              accent={note.accent}
              editing={note.editing}
            />
          );
        })
      )}
    </section>
  );
}

export default NotesSection;

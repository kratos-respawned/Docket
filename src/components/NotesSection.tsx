"use client";
import { Note as NoteType } from "@/typings/note";
import Note from "./Note";
import useSWR from "swr";
import fetchNotes from "@/lib/fetchNotes";
function NotesSection() {
  let notes: NoteType[] = [];
  const { data, isLoading, isValidating } = useSWR(
    "/api/getNotes",
    fetchNotes,
    {
      revalidateOnFocus: false,
    }
  );
  if (!data) {
    return null;
  }
  if (data.notes) {
    notes = data.notes;
  }
  return (
    <section className="h-full w-full flex flex-wrap gap-6 mt-10 ">
      {notes.length === 0 ? (
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

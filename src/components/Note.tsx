"use client";
import fetchNotes from "@/lib/fetchNotes";
import type { Note } from "@/typings/note";
import { Edit2, Save, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

function Note({
  accent,
  content,
  editing,
  id,
}: {
  id: number;
  accent: string;
  content: string;
  editing: boolean;
}) {
  const { data, mutate } = useSWR("/api/getNotes", fetchNotes, {
    revalidateOnFocus: false,
  });
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(editing);
  const [noteContent, setContent] = useState(content);
  const text = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (edit) text.current?.focus();
  }, [edit]);
  const modify = async (id: number, content: string) => {
    const data = { id: id, content: content, accent: accent };
    const res = await fetch("/api/mutateNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  const remove = async (id: number) => {
    setLoading(true);
    const res = await fetch("/api/deleteNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    setLoading(false);
    mutate(data, {
      optimisticData: {
        notes: data.notes.filter((note: Note) => note.id !== id),
      },
      rollbackOnError: true,
    });
  };
  return (
    <form className={`font-montserrat ${accent} note relative`}>
      <textarea
        ref={text}
        placeholder="Type something..."
        value={loading ? "Deleting..." : noteContent}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        disabled={edit ? false : true}
        className="w-full h-full bg-transparent overflow-clip  outline-none focus:outline-none focus:border-none border-none "
      />
      <div className="absolute w-full flex justify-end gap-x-4   bottom-0 right-0 px-5 pb-4 pt-2  ">
        <button
          onClick={(e) => {
            e.preventDefault();
            setEdit(!edit);
          }}
          className={`edit  ml-auto bg-transparent  border-none outline-none focus:outline-none focus:border-none ${
            edit ? "hidden" : " grid"
          } `}
        >
          <Edit2 />
        </button>
        <button
          type="button"
          onClick={async (e) => {
            setEdit(!edit);
            await modify(id, noteContent);
          }}
          className={`edit w-fit  bg-transparent  border-none outline-none focus:outline-none focus:border-none ${
            edit ? "grid " : " hidden"
          } `}
        >
          <Save />
        </button>
        <button
          type="button"
          onClick={async (e) => {
            await remove(id);
            setEdit(!edit);
          }}
          className={`edit w-fit  bg-transparent  border-none outline-none focus:outline-none focus:border-none ${
            edit ? "grid " : " hidden"
          } `}
        >
          <Trash />
        </button>
      </div>
    </form>
  );
}

export default Note;

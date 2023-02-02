"use client";
import { useEffect, useRef, useState } from "react";
import { Note as TypeNote, useNotes } from "@/db/store";
export default function Notes() {
  const notes = useNotes((state) => state.notes);
  return (
    <section className="flex flex-wrap gap-4 ">
      {notes.map((note: TypeNote) => {
        return <Note key={note.id} {...note} />;
      })}
    </section>
  );
}

function Note(props: TypeNote) {
  const text = useRef<HTMLTextAreaElement>(null);
  const updateNote = useNotes((state) => state.updateNote);
  const removeNote = useNotes((state) => state.removeNote);
  useEffect(() => {
    if (props.editing) text.current?.focus();
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.current?.value) return;
        if (text.current?.value === props.content) return;
        const newNote = {
          ...props,
          content: text.current?.value,
          editing: false,
          lastModified: new Date().toDateString(),
        };
        updateNote(props.id, newNote);
      }}
      className={`note ${props.accent}`}
    >
      <textarea
        name=""
        id=""
        ref={text}
        readOnly={!props.editing}
        className="overflow-clip resize-none  bg-transparent outline-none border-none h-full w-full text-base sm:text-xl"
      >
        {props.content}
      </textarea>

      <div className="absolute w-full  py-3 bg-inherit flex justify-between items-center bottom-0 left-0 px-4">
        <p className="text-sm">May 21, 2020</p>
        {props.editing ? (
          <div className="flex gap-2">
            <button
              onClick={() => {
                removeNote(props.id);
              }}
              className="text-white text-sm grid place-content-center w-12 aspect-square rounded-full bg-red-500 "
            >
              <span>Delete</span>
            </button>
            <button
              onClick={() => {
                updateNote(props.id, { ...props, editing: false });
              }}
              className="text-black text-sm grid place-content-center w-12 aspect-square rounded-full bg-white "
            >
              <span>Save</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              updateNote(props.id, { ...props, editing: true });
            }}
            className="text-white text-sm grid place-content-center w-12 aspect-square rounded-full bg-black "
          >
            <span>Edit</span>
          </button>
        )}
      </div>
    </form>
  );
}

export const Button = () => {
  return (
    <button
      className={`fixed bottom-4 right-4 w-14 aspect-square rounded-full bg-purple-600 z-10`}
      onClick={() => {
        globalThis.window.scrollTo(0, 0);
      }}
    >
      Top
    </button>
  );
};

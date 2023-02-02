"use client";
import { useEffect, useRef } from "react";
import { Note as TypeNote, useNotes } from "@/db/store";
import { MdDelete, MdEdit, MdOutlineSave } from "react-icons/md";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/configs";
export default function Notes() {
  const firstRender = useRef(true);
  const collectionRef = collection(db, "notes");
  const addNote = useNotes((state) => state.addNote);
  const emptyNote = useNotes((state) => state.emptyNotes);
  useEffect(() => {
    async function fetchNotes() {
      let val = await getDocs(collectionRef);
      val.docs.map((doc) => {
        addNote({
          editing: doc.data().editing,
          content: doc.data().content,
          lastModified: doc.data().lastModified,
          accent: doc.data().accent,
          id: doc.id,
        });
      });
    }
    if (firstRender.current) {
      fetchNotes();
      firstRender.current = false;
      return;
    }

    return () => {
      emptyNote();
    };
  }, []);
  const list = useNotes((state) => state.notes);
  return (
    <section className="flex flex-wrap gap-4 ">
      {list.length === 0 ? (
        <h1 className="text-2xl">No notes yet</h1>
      ) : (
        list.map((note: TypeNote) => {
          return <Note key={note.id} {...note} />;
        })
      )}
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
  const Delete = (id: string) => {
    const currentNote = useNotes
      .getState()
      .notes.find((note) => note.id === id);
    if (!currentNote) return;
    const noteDoc = doc(db, "notes", id);
    removeNote(id);
    deleteDoc(noteDoc).catch(() => {
      useNotes().addNote(currentNote);
    });
  };
  const Update = (id: string) => {
    const currentNote = useNotes
      .getState()
      .notes.find((note) => note.id === id);
    if (!currentNote) return;
    if (!text.current) return;
    // check if the note exists in the database
    // if it does, update it
    // if it doesn't, add it

    updateNote(id, { ...props, editing: false, content: text.current.value });
    const noteDoc = doc(db, "notes", id);
    updateDoc(noteDoc, {
      editing: false,
      content: text.current?.value,
      lastModified: new Date().toDateString(),
    }).catch(() => {
      updateNote(id, { ...currentNote, editing: false });
    });
  };
  return (
    <form
      key={props.id}
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={`note ${props.accent}`}
    >
      <textarea
        name=""
        id=""
        ref={text}
        onBlur={() => {
          if (text.current?.value === "") Delete(props.id);
        }}
        readOnly={!props.editing}
        placeholder="Type something..."
        defaultValue={props.content}
        className="overflow-clip resize-none   bg-transparent outline-none border-none h-full w-full text-base sm:text-xl"
      />
      <div className="absolute w-full  py-3 bg-inherit flex justify-between items-center bottom-0 left-0 px-4">
        <p className="text-sm">{props.lastModified}</p>
        {props.editing ? (
          <div className="flex gap-2">
            <button
              onClick={() => {
                Delete(props.id);
              }}
              className="text-white  text-xl shadow-lg shadow-slate-700 bg-red-400  grid place-content-center w-12 aspect-square rounded-full  "
            >
              <MdDelete />
            </button>
            <button
              onClick={() => {
                Update(props.id);
              }}
              className="text-black text-xl grid place-content-center w-12 aspect-square rounded-full bg-white "
            >
              <MdOutlineSave />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              updateNote(props.id, { ...props, editing: true });
            }}
            className="text-white text-xl grid place-content-center w-12 aspect-square rounded-full bg-black "
          >
            <MdEdit />
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

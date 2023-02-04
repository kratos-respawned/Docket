"use client";
import { useEffect, useRef, useState } from "react";
import { Note as TypeNote } from "@/typings/note";
import { MdDelete, MdEdit, MdOutlineSave } from "react-icons/md";
import {
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import useSWR, { KeyedMutator } from 'swr';
import { db } from "@/firebase/configs";
import fetcher from "@/utils/fetcher";
export default function Notes({ initialData }: { initialData: TypeNote[] }) {
  const { data, mutate } = useSWR("getData", fetcher);
  let list = data;
  if (!data) list = initialData;
  return (
    <section className="flex flex-wrap gap-4 ">
      {
        (list || initialData).map((note: TypeNote) => {
          return <Note key={note.id} del={mutate} {...note} />;
        })
      }
    </section>
  );
}




function Note(props: {
  editing: boolean;
  content: string;
  lastModified: string;
  accent: string;
  id: string;
  del: KeyedMutator<TypeNote[] | undefined>
}) {
  const [data, setData] = useState({
    editing: props.editing,
    content: props.content,
    lastModified: props.lastModified,
    accent: props.accent,
    id: props.id,
  });

  const text = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (data.editing) text.current?.focus();
  }, [data.editing]);
  const Delete = (id: string) => {
    const currentNote = data;
    setData({ ...data, editing: false });
    const noteDoc = doc(db, "notes", id);
    deleteDoc(noteDoc).then(() => {
      props.del((data: any) => {
        return data.filter((note: any) => note.id !== id);
      });
    });

  };
  const Update = (id: string) => {
    const currentNote = data;
    if (!text.current) return;
    setData({ ...data, editing: false });
    const noteDoc = doc(db, "notes", id);
    updateDoc(noteDoc, {
      editing: false,
      content: text.current?.value,
      lastModified: new Date().toDateString(),
    }).catch(() => {
      setData({ ...currentNote, editing: false });
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
        readOnly={!data.editing}
        placeholder="Type something..."
        value={data.content}
        onChange={(e) => {
          setData({ ...data, content: e.target.value });
        }}
        className="overflow-clip resize-none   bg-transparent outline-none border-none h-full w-full text-base sm:text-xl"
      />
      <div className="absolute w-full  py-3 bg-inherit flex justify-between items-center bottom-0 left-0 px-4">
        <p className="text-sm">{data.lastModified}</p>
        {data.editing ? (
          <div className="flex gap-2">
            <button
              onClick={() => {
                Delete(data.id);
              }}
              className="edit warn  "
            >
              <MdDelete />
            </button>
            <button
              onClick={() => {
                Update(data.id);
              }}
              className="edit "
            >
              <MdOutlineSave />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setData({ ...data, editing: true });
            }}
            className="edit "
          >
            <MdEdit />
          </button>
        )}
      </div>
    </form>
  );
}


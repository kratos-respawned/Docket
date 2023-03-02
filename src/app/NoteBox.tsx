"use client";
import { useEffect, useRef, useState } from "react";
import { MdDelete, MdEdit, MdOutlineSave } from "react-icons/md";
import { m } from "framer-motion";
import { Note } from "@/typings/note";
import useNoteStore from "@/store/noteStore";
export default function NoteBox(props: {
    editing: boolean;
    content: string;
    lastModified: string;
    accent: string;
    id?: string | number;
}) {
    const DeleteNote = useNoteStore((state) => state.deleteNote);
    const UpdateNote = useNoteStore((state) => state.modifyNote);
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

    return (
        <m.form
            initial={{ opacity: 0, scale: 0, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, scale: 0, y: -40, transition: { duration: 0.3 } }}
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
                                if (!data.id) return;
                                DeleteNote(data.id as string);
                            }}
                            className="edit warn  "
                        >
                            <MdDelete />
                        </button>
                        <button
                            onClick={() => {
                                if (!data.id) return;
                                if (data.content.length === 0) DeleteNote(data.id as string);

                                UpdateNote(props.id as string, { ...data, editing: false })
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
        </m.form>
    );
}
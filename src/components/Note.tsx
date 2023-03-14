"use client"
import supabase from "@/lib/supabaseClient";
import useNoteStore from "@/store/noteStore";
import { Edit2, Save, Trash } from "lucide-react"
import { useEffect, useRef, useState } from "react"

function Note({ accent, content, editing, id }: { id: number, accent: string, content: string, editing: boolean }) {
    const [edit, setEdit] = useState(editing)
    const [noteContent, setContent] = useState(content);
    const Delete = useNoteStore(state => state.deleteNote);
    const Update = useNoteStore(state => state.modifyNote);
    const text = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (edit)
            text.current?.focus()
    }, [edit])
    const deleteNote = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const { data, error } = await supabase.from('notes').delete().match({ id: id })
        Delete(id);
        console.log(data, error)
        if (error) return <h1>error</h1>
    }
    return (
        <form className={`font-montserrat ${accent} note relative`}>
            <textarea
                ref={text}
                placeholder="Type something..."
                value={noteContent}
                onChange={(e) => { setContent(e.target.value) }}
                disabled={edit ? false : true}
                className="w-full h-full bg-transparent overflow-clip  outline-none focus:outline-none focus:border-none border-none " />
            <div className="absolute w-full flex justify-end gap-x-4   bottom-0 right-0 px-5 pb-4 pt-2  ">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setEdit(!edit)

                    }}
                    className={`edit  ml-auto bg-transparent  border-none outline-none focus:outline-none focus:border-none ${edit ? "hidden" : " grid"} `}>
                    <Edit2 />
                </button>
                <button
                    onClick={async (e) => {
                        e.preventDefault();
                        setEdit(!edit)
                        if (text.current?.value) {
                            const { data, error } = await supabase.from('notes').update({ content: noteContent, lastModified: new Date().toISOString() }).match({ id: id })
                            Update(id, {
                                content: noteContent,
                                accent: accent,
                                editing: false,
                                id: id,
                                lastModified: new Date().toISOString()
                            })
                        }


                    }}
                    className={`edit w-fit  bg-transparent  border-none outline-none focus:outline-none focus:border-none ${edit ? "grid " : " hidden"} `}>
                    <Save />
                </button>
                <button
                    onClick={(e) => {
                        deleteNote(e);
                    }}
                    className={`edit w-fit  bg-transparent  border-none outline-none focus:outline-none focus:border-none ${edit ? "grid " : " hidden"} `}>
                    <Trash />
                </button>
            </div>

        </form>
    )
}

export default Note;
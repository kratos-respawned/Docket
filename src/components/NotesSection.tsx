"use client"
import useNoteStore from "@/store/noteStore";
import StoreInitializer from "@/store/StoreInitializer"
import { Note as NoteType } from "@/typings/note"
import Note from "./Note"


function NotesSection({ notes }: { notes: NoteType[] }) {
    const data = useNoteStore(state => state.notes);
    return (
        <section className="h-full w-full flex flex-wrap gap-6 mt-10 ">
            <StoreInitializer data={notes} />
            {data.length === 0 ? <h1 className="mt-10 text-2xl font-montserrat">Click on + to add notes</h1> :
                data?.map((note) => (
                    <Note key={note.id} id={note.id} content={note.content} accent={note.accent} editing={note.editing} />
                ))
            }
        </section>
    )
}

export default NotesSection
"use client";
import { Note } from "@/typings/note";
import NoteBox from "./NoteBox";
import { AnimatePresence, domAnimation, LazyMotion } from "framer-motion";
export default function Notes() {
  let list: Note[] = [{
    accent: "gold",
    content: "Hello",
    editing: false,
    id: "1",
    lastModified: "1"
  }]
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <section
          className="flex flex-wrap gap-4 ">
          {
            // (isLoading || isValidating) ? <p className="text-nBlack dark:text-white text-4xl">Loading...</p> :
            list.length === 0 ? <p className="text-nBlack dark:text-white text-4xl">
              No notes found. <p className="text-xl mt-4"> Click on the + button to add a new note.</p>
            </p> :
              (list).map((note: Note) => {
                return <NoteBox key={note.id} {...note} />;
              })


          }
        </section>
      </AnimatePresence>
    </LazyMotion>
  );
}







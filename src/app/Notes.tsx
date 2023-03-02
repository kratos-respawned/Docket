"use client";
import { Note } from "@/typings/note";
import NoteBox from "./NoteBox";
import { AnimatePresence, domAnimation, LazyMotion } from "framer-motion";
import useNoteStore from "@/store/noteStore";
export default function Notes() {
  let list: Note[] = useNoteStore((state) => state.notes);
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <section
          className="flex flex-wrap gap-4 ">
          {
            list.length === 0 ? <p className="text-nBlack dark:text-white text-4xl">
              No notes found. <p className="text-xl mt-4"> Click on the + button to add a new note.</p>
            </p> :
              (list).map((note: Note, index) => {
                return <NoteBox key={index} id={index} {...note} />;
              })


          }
        </section>
      </AnimatePresence>
    </LazyMotion>
  );
}







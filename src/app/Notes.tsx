"use client";
import { Note as TypeNote } from "@/typings/note";
import useSWR from 'swr';
import fetcher from "@/utils/fetcher";
import Note from "./Note";
import { AnimatePresence, domAnimation, LazyMotion } from "framer-motion";
export default function Notes() {
  const { data, mutate, isLoading, isValidating, error } = useSWR("getData", fetcher);
  if (error) return <p className="text-nBlack dark:text-white text-4xl">error</p>
  const list = data || [];

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <section
          className="flex flex-wrap gap-4 ">
          {
            (isLoading || isValidating) ? <p className="text-nBlack dark:text-white text-4xl">Loading...</p> :
              (list.length === 0 ? <p className="text-nBlack dark:text-white text-4xl">
                No notes found. <p className="text-xl mt-4"> Click on the + button to add a new note.</p>
              </p> :
                (list).map((note: TypeNote) => {
                  return <Note key={note.id} del={mutate} {...note} />;
                })
              )

          }
        </section>
      </AnimatePresence>
    </LazyMotion>
  );
}







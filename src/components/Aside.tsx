"use client";
import fetchNotes from "@/lib/fetchNotes";
import { Note } from "@/typings/note";
import { Plus } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
function Aside() {
  const [active, setActive] = useState(false);
  const { data: notes, mutate } = useSWR("/api/getNotes", fetchNotes, {
    revalidateOnFocus: false,
  });
  console.log(notes);
  const createNote = async (accent: string) => {
    const id = new Date().getTime();
    await fetch("/api/addNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accent: accent, id: id }),
    });
    const note: Note = {
      id: id,
      content: "",
      accent: accent,
      editing: true,
      timestamp: new Date().getTime(),
    };
    if (!notes.notes) {
      mutate({ notes: [note] });
    } else {
      if (notes.notes.length === 0) {
        mutate({ notes: [note] });
      } else {
        await mutate(notes, {
          optimisticData: {
            notes: [note, ...notes.notes],
          },
          rollbackOnError: true,
        });
      }
    }
  };
  return (
    <aside className="border-r-2 border-white  my-5 ">
      <nav className=" ">
        <h1 className="text-xl  text-center font-montserrat font-extrabold px-3 my-4">
          DOCKET
        </h1>
        <button
          onClick={() => {
            setActive(!active);
          }}
          className="w-12 mx-auto mt-12 mb-7 aspect-square rounded-full bg-white grid place-items-center "
        >
          <Plus className="text-nblack" />
        </button>
        {active ? (
          <ul className="flex flex-col gap-y-4 ">
            {buttonProps.map((props, index) => {
              return (
                <li key={index}>
                  <button
                    onClick={async () => {
                      await createNote(props.accent);
                    }}
                    className={`button block mx-auto ${props.accent} `}
                  ></button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </nav>
    </aside>
  );
}

export default Aside;
const buttonProps = [
  {
    accent: "gold",
  },
  {
    accent: "orange",
  },
  {
    accent: "purple",
  },
  {
    accent: "blue",
  },
  {
    accent: "lime",
  },
];

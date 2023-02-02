"use client";

import { useState } from "react";
import { useNotes } from "@/db/store";
function Navbar() {
  const createNote = useNotes((state) => state.addNote);
  const [visible, setVisibility] = useState(false);
  return (
    <div className="sticky flex flex-col text-white gap-y-3 py-3 items-center  top-28 ">
      <button
        onClick={() => {
          setVisibility(!visible);
        }}
        className="w-12 aspect-square rounded-full bg-black mb-7"
      >
        {visible ? "x" : "+"}
      </button>
      {visible && (
        <>
          {buttonProps.map((props) => {
            return (
              <button
                onClick={() => {
                  createNote({
                    id: Math.random().toString(36),
                    editing: true,
                    accent: props.accent,
                    content: `
                    The beginning of screenless design: UI jobs to be take over by Solution
                    `,
                    lastModified: new Date().toDateString(),
                  });
                  setVisibility(false);
                }}
                className={`button ${props.accent}`}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
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
export default Navbar;

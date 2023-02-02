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
          {buttonProps.map((props, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  createNote({
                    id: Date.now().toString() + index + Math.random(),
                    editing: true,
                    accent: props.accent,
                    content: ``,
                    lastModified: new Date().toDateString(),
                  });
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

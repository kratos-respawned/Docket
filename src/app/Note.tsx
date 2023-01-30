"use client";

import { useState } from "react";

function Note({ index, accent }: { index: number; accent?: string }) {
  const [editing, setEditing] = useState(false);
  const id = index;
  return (
    <div className={`note ${accent}`}>
      <textarea
        name=""
        id=""
        onChange={() => {}}
        readOnly={editing}
        className="overflow-clip resize-none  bg-transparent outline-none border-none h-full w-full"
        value="The beginning of screenless design: UI jobs to be take over by Solution
        Architect"
      />

      <div className="absolute w-full  py-3 bg-inherit flex justify-between items-center bottom-0 left-0 px-4">
        <p className="text-sm">May 21, 2020</p>
        {editing ? (
          <div className="flex gap-2">
            <button className="text-white text-sm grid place-content-center w-12 aspect-square rounded-full bg-red-500 ">
              <span>Delete</span>
            </button>
            <button
              onClick={() => {
                setEditing(false);
              }}
              className="text-black text-sm grid place-content-center w-12 aspect-square rounded-full bg-white "
            >
              <span>Save</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setEditing(!editing);
            }}
            className="text-white text-sm grid place-content-center w-12 aspect-square rounded-full bg-black "
          >
            <span>Edit</span>
          </button>
        )}
      </div>
    </div>
  );
}

export const Button = () => {
  return (
    <button
      className="fixed bottom-4 right-4 w-14 aspect-square rounded-full bg-purple-600 z-10"
      onClick={() => {
        globalThis.window.scrollTo(0, 0);
      }}
    >
      Top
    </button>
  );
};

export default Note;

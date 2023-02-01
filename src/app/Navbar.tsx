"use client";

import { useState } from "react";

function Navbar() {
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
          <button className=" button gold" />
          <button className="button orange" />
          <button className="button purple" />
          <button className="button blue" />
          <button className="button lime" />
        </>
      )}
    </div>
  );
}

export default Navbar;

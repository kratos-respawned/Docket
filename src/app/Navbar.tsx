"use client";
function Navbar() {
  return (
    <div className="sticky flex flex-col  gap-y-3 py-3 items-center  top-28 ">
      <button className="w-12 aspect-square rounded-full bg-black mb-7">
        +
      </button>
      <button className=" button gold" />
      <button className="button orange" />
      <button className="button purple" />
      <button className="button blue" />
      <button className="button lime" />
    </div>
  );
}

export default Navbar;

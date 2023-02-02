import Navbar from "./Navbar";
import Notes, { Button } from "./Notes";
export default async function Home() {
  return (
    <main className="main   bg-white  py-7 ">
      <nav className=" h-full  text-black  px-3 sm:px-7 border-r-2 border-r-slate-200">
        <h1 className="sticky top-4 py-2 font-bold text-xl">Docket</h1>
        <Navbar />
      </nav>
      <main className="text-black w-11/12 mx-auto">
        <form action="" className="relative mb-12">
          <label
            htmlFor="Search"
            className="absolute top-1/2 -translate-y-1/2 left-1 text-black pointer-events-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a1a7b6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </label>
          <input
            name="Search"
            placeholder="Search"
            className=" text-xl focus:outline-none focus:border-none    text-black placeholder:text-gray-400 pl-8 py-2"
          />
        </form>
        <h1 className="font-bold text-7xl my-12">Notes</h1>
        <Notes />
      </main>
      {/* <Button /> */}
    </main>
  );
}

"use client"

import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { useRef } from "react"


function SearchBar() {
    const initialValue: any = null;
    const search = useRef(initialValue);
    return (
        <div className="relative my-3 w-2/5  " >
            <SearchIcon onClick={() => {
                if (search.current)
                    search.current.focus()
            }} className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2" />
            <Input ref={search} placeholder="Search" className="pl-8 w-full placeholder:font-montserrat text-xl font-montserrat placeholder:text-xl  outline-none border-none  focus:border-none" />
        </div>
    )
}

export default SearchBar
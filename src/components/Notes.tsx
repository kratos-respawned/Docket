"use client"
import { Edit2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

function Notes({ accent, content, editing }: { accent: string, content: string, editing: boolean }) {
    const [edit, setEdit] = useState(editing)

    const text = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (edit)
            text.current?.focus()
    }, [edit])
    return (
        <form className={`font-montserrat ${accent} note relative`}>
            <textarea
                ref={text}
                placeholder="Type something..."
                value={content}
                disabled={edit ? false : true}
                className="w-full h-full bg-transparent overflow-clip  outline-none focus:outline-none focus:border-none border-none " />
            <div className="absolute w-full bottom-0 right-0 px-5 pb-4 pt-2  ">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setEdit(!edit)

                    }}
                    className="edit block ml-auto bg-transparent  border-none outline-none focus:outline-none focus:border-none">
                    <Edit2 />
                </button>
            </div>

        </form>
    )
}

export default Notes
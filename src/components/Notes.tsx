import { Note } from "@/typings/note"
import { Edit, Edit2 } from "lucide-react"

function Notes(props: Note) {
    return (
        <form className={`font-montserrat ${props.accent} note relative`}>
            <textarea
                placeholder="Type something..."
                value={props.content}
                disabled={props.editing ? false : true}
                className="w-full h-full bg-transparent overflow-clip  outline-none focus:outline-none focus:border-none border-none " />
            <div className="absolute w-full bottom-0 right-0 px-5 pb-4 pt-2  ">
                <button
                    className="edit block ml-auto bg-transparent border-none outline-none focus:outline-none focus:border-none">
                    <Edit2 />
                </button>
            </div>

        </form>
    )
}

export default Notes
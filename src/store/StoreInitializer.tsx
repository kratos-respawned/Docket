"use client";

import Notes from "@/app/Notes";
import { Note } from "@/typings/note";
import { useRef } from "react";
import useNoteStore from "./noteStore";

function StoreInitializer({ data }: { data: Note[] }) {
    const initialized = useRef(false);
    if (!initialized.current) {
        useNoteStore.setState({ notes: data })
        initialized.current = true;

    }
    return null;
}
export default StoreInitializer
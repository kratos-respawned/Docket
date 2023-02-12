
import { db } from "@/firebase/configs";
import { Note } from "@/typings/note";
import { collection, getDocs } from "firebase/firestore";
const fetcher = async (key: string) => {
    let data: Note[] = [];
    const collectionRef = collection(db, "notes");
    let val = await getDocs(collectionRef);
    data = val.docs.map((doc) => {
        return {
            editing: doc.data().editing,
            content: doc.data().content,
            lastModified: doc.data().lastModified,
            accent: doc.data().accent,
            id: doc.id,
        }
    });
    if (key === "getData") {
        return data;
    }
    if (key === "delete") {
        let val = await getDocs(collectionRef);
        data = val.docs.map((doc) => {
            return {
                editing: doc.data().editing,
                content: doc.data().content,
                lastModified: doc.data().lastModified,
                accent: doc.data().accent,
                id: doc.id,
            }
        });
        return data;
    }


}


export default fetcher;
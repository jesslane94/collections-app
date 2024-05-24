//import { collection, documentId, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase-config";
// import { storage } from "../config/firebase-config";

export const useDeleteItem = (docID) => {
    const deleteItem = async() => {
        await deleteDoc(doc(db, "items", docID));
    }

    return { deleteItem };
};

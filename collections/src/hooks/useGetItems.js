import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserID } from './useGetUserID';

export const useGetItems = () => {
    const [ items, setItems ] = useState([]);
    const [ totalItems, setTotalItems ] = useState(0)
    const { userID } = useGetUserID();

    const itemCollection = collection(db, "items");
    
    const getItems = async () => {
        let unsubscribe;
        try {
            const queryItems = query(itemCollection, 
                where("userID", "==", userID),
                orderBy("createdAt")
            );

            unsubscribe = onSnapshot(queryItems, (snapshot) => {
                let docs = [];
                let totalItems = 0;
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({...data, id});
                    totalItems = totalItems + 1;
                });

                setItems(docs);
                setTotalItems(totalItems);
            });
        } catch (err) {
            console.error(err);
        }

        return () => unsubscribe();
    };

    useEffect(() => {
        getItems();
    });

    return { items, totalItems };
}
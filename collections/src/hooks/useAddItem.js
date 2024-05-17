// @flow

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserID } from './useGetUserID';
import { storage } from "../config/firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


type Props = {
    itemName: string,
    file: File,
    description: string,
    type: string,
    brandOrCreator: string,
    price: number,
    series: string,
    character: string,
    dateAcquired: string,
    inCollection: boolean,
}

export const useAddItem = (): any => {
    const itemCollectionRef = collection(db, "items");
    const { userID } = useGetUserID();

    const addItem = async ({
        itemName,
        file,
        description,
        type,
        brandOrCreator,
        price,
        series,
        character,
        dateAcquired,
        inCollection,
    }: Props) => {
        const storageRef = ref(storage, file.name);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (_) => {

            },
            (_) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    return downloadURL;
                }).then(async (downloadUrl) =>
                    await addDoc(itemCollectionRef, {
                        userID,
                        itemName,
                        downloadUrl,
                        description,
                        type,
                        brandOrCreator,
                        price,
                        series,
                        character,
                        dateAcquired,
                        inCollection,
                        createdAt: serverTimestamp()
                    })
                );
            }
        );


        // await addDoc(itemCollectionRef, {
        //     userID,
        //     itemName,
        //     downloadUrl,
        //     description,
        //     type,
        //     brandOrCreator,
        //     price,
        //     series,
        //     character,
        //     dateAcquired,
        //     inCollection,
        //     createdAt: serverTimestamp()
        // });
    };

    return { addItem };
};
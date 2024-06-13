// @flow

import {
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
  doc
} from 'firebase/firestore'
import { db } from '../config/firebase-config'
import { useGetUserID } from './useGetUserID'
import { storage } from '../config/firebase-config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

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
  inCollection: boolean
}

export const useAddItem = (): any => {
  const itemCollectionRef = collection(db, 'items')
  const { userID } = useGetUserID()

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
    inCollection
  }: Props) => {
    // upload to file under userID
    const storageRef = ref(storage, userID + '/' + file.name)

    const uploadTask = uploadBytesResumable(storageRef, file)

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
          default:
          //do nothing
        }
      },
      error => {
        console.log('picture failed to upload')
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref)
          .then(downloadURL => {
            return downloadURL
          })
          .then(
            async downloadUrl =>
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
              }).then(
                async res =>
                  await updateDoc(doc(db, 'items', res.id), {
                    id: res.id,
                    fileName: file.name
                  })
              )
          )
      }
    )
  }

  return { addItem }
}

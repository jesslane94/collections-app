import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase-config'
// import { useGetUserID } from './useGetUserID'

export const useUpdateItem = data => {
  // const { userID } = useGetUserID()
  const updateItem = async () => {
    // if picture, need to reupload
    // update only changed fields?
    const itemRef = doc(db, 'items', data.id)
    await updateDoc(itemRef, data)
  }

  return { updateItem }
}

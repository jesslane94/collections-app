import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase-config'
// import { useGetUserID } from './useGetUserID'

export const useUpdateItem = item => {
  // const { userID } = useGetUserID()
  const updateItem = async () => {
    //pass in json of data?
    const data = {
      description: 'yada yada'
    }
    // if picture, need to reupload
    // update only changed fields?
    const itemRef = doc(db, 'items', item)
    await updateDoc(itemRef, data)
  }

  return { updateItem }
}

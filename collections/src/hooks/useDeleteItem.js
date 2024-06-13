import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../config/firebase-config'
import { ref, deleteObject } from 'firebase/storage'
import { useGetUserID } from './useGetUserID'

export const useDeleteItem = item => {
  const { userID } = useGetUserID()
  const deleteItem = async () => {
    const imageRef = ref(storage, userID + '/' + item.fileName)
    // Delete the file
    deleteObject(imageRef)
      .then(() => {
        // File deleted successfully
      })
      .catch(error => {
        // Uh-oh, an error occurred!
      })
    deleteDoc(doc(db, 'items', item.id))
  }

  return { deleteItem }
}

import { useState } from 'react'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../config/firebase-config'
import { ref, deleteObject } from 'firebase/storage'
import { useGetUserID } from './useGetUserID'

export const useDeleteItem = () => {
  const { userID } = useGetUserID()
  const [message, setMessage] = useState(null)

  const deleteItem = async item => {
    console.log(item)
    const imageRef = ref(storage, userID + '/' + item.fileName)
    // Delete the file
    deleteObject(imageRef)
      .then(() => {
        //image deleted successfully
      })
      .catch(error => {
        // Uh-oh, an error occurred!
      })
    deleteDoc(doc(db, 'items', item.id))
      .then(() => {
        setMessage('Item deleted successfully!')
      })
      .catch(error => {
        setMessage('An error occurred while trying to delete the item.')
      })
  }

  return { deleteItem, message }
}

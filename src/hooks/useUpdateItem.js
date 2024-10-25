import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import { useGetUserID } from './useGetUserID'
import { storage } from '../config/firebase-config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'


export const useUpdateItem = (data, file) => {
  const { userID } = useGetUserID()
  const updateItem = async () => {
    // update only changed fields?
    const itemRef = doc(db, 'items', data.id)

    //update image if file
    if (file){
      console.log("in file uploading loop...")
      const storageRef = ref(storage, userID + '/' + file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)
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
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            data.downloadUrl = downloadURL
            data.fileName = file.name
              updateDoc(itemRef, data)
          })
        }
      )
    }
    else {
       await updateDoc(itemRef, data)
    }
  
  }

  return { updateItem }
}

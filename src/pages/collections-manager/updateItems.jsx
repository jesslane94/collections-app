import { useState, useEffect } from 'react'
import { useUpdateItem } from '../../hooks/useUpdateItem'
import { useParams } from 'react-router-dom'

import { query, collection, where, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase-config'
import { useGetUserID } from '../../hooks/useGetUserID'

import './styles.css'

export const UpdateItems = () => {
  const [message, setMessage] = useState('')
  const [currentData, setCurrentData] = useState([])
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)

  var data = {}
  const { updateItem } = useUpdateItem(data, file)
  const { id } = useParams()
  const { userID } = useGetUserID()

  const types = ['image/png', 'image/jpeg', 'image/jpg']

  // get data to set already existing values in form as placeholders
  useEffect(() => {
    const itemCollection = collection(db, 'items')
    var itemData = {}
    const q = query(
      itemCollection,
      where('id', '==', id),
      where('userID', '==', userID)
    )
    const querySnapshot = async () => {
      await getDocs(q).then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = doc.data()
          itemData = { ...data, id }
        })
      })
    }
    querySnapshot().then(data => setCurrentData(itemData))
  }, [id, userID])

  console.log(currentData)

  const onSubmit = e => {
    e.preventDefault()

    data.id = id

    // file error handling
    if (error) {
      setMessage('Please upload an image file in png or jpg format.')
    }
    else {
      updateItem(data, file)
      .then(() => {
        setMessage('Item Updated Successfully!')
      })
      .catch(error => {
        setMessage('There was an error while updating.')
      })
    }
  }

  return (
    <>
      <div className='collections'>
        <br></br>
        <div className='container'>
          <div className='result'>
            <h1>{message}</h1>
            <p></p>
          </div>
          <div className='item'>
            <h1>Update Item</h1>
          </div>
          <form className='update-item' onSubmit={onSubmit}>
          <p></p>
            <input
              type='file'
              onChange={e => {
                let selectedFile = e.target.files[0]
                if (selectedFile) {
                  if (types.includes(selectedFile.type)) {
                    setError(null)
                    setFile(selectedFile)
                  } else {
                    setFile(null)
                    setError('Please select an image file (png or jpg)')
                  }
                }
              }}
            />
            <p></p>
            <input
              type='text'
              placeholder={currentData.itemName || 'Item Name'}
              onChange={e => (data.itemName = e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder={currentData.description || 'Description'}
              onChange={e => (data.description = e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder={currentData.type || 'Type'}
              onChange={e => (data.type = e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder={currentData.brandOrCreator || 'Brand or Creator'}
              onChange={e => (data.brandOrCreator = e.target.value)}
            />
            <p></p>
            <input
              type='number'
              placeholder={currentData.price || 'Price'}
              onChange={e => (data.price = e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder={currentData.series || 'Series'}
              onChange={e => (data.series = e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder={currentData.character || 'Character'}
              onChange={e => (data.character = e.target.value)}
            />
            <p></p>
            <input
              type='date'
              placeholder={currentData.dateAcquired || 'Date Acquired'}
              onChange={e => (data.dateAcquired = e.target.value)}
            />
            <p></p>
            In Collection:
            <label>
              <input
                type='radio'
                name='inCollectionRadio'
                value='yes'
                defaultChecked={currentData.inCollection || true}
                onChange={e => (data.inCollection = e.target.value)}
              />
              Yes
            </label>
            <label>
              <input
                type='radio'
                name='inCollectionRadio'
                value='no'
                onChange={e => (data.inCollection = e.target.value)}
              />
              No
            </label>
            <p></p>
            <button type='submit'>Update Item</button>
          </form>
        </div>
      </div>
    </>
  )
}

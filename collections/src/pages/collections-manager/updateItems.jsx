import { useState } from 'react'
import { useUpdateItem } from '../../hooks/useUpdateItem'
import { useParams } from 'react-router-dom'

import './styles.css'

export const UpdateItems = () => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')
  var data = {}
  const { updateItem } = useUpdateItem(data)

  const types = ['image/png', 'image/jpeg', 'image/jpg']
  const { id } = useParams()

  const onSubmit = e => {
    e.preventDefault()

    if (file != null) {
      data.file = file
    }
    data.id = id

    updateItem(data)
      .then(() => {
        setMessage('Item Updated Successfully!')
      })
      .catch(error => {
        setMessage('there was an error while udpating.')
      })

    // file error handling
    if (error) {
      console.error(error)
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
              placeholder='Item Name'
              onChange={e => (data.name = e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder='Description'
              onChange={e => (data.description = e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder='Type'
              onChange={e => (data.type = e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder='Brand or Creator'
              onChange={e => (data.brandOrCreator = e.target.value)}
            />
            <p></p>
            <input
              type='number'
              placeholder='Price'
              onChange={e => (data.price = e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder='Series'
              onChange={e => (data.series = e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder='Character'
              onChange={e => (data.character = e.target.value)}
            />
            <p></p>
            <input
              type='date'
              placeholder='Date Acquired'
              onChange={e => (data.dateAcquired = e.target.value)}
            />
            <p></p>
            In Collection:
            <label>
              <input
                type='radio'
                name='inCollectionRadio'
                value='yes'
                defaultChecked={true}
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

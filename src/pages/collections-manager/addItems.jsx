import { useState } from 'react'
import { useAddItem } from '../../hooks/useAddItem'
import { useGetUserID } from '../../hooks/useGetUserID'

import './styles.css'

export const AddItems = () => {
  // setting document fields
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [itemName, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [brandOrCreator, setBrandOrCreator] = useState('')
  const [price, setPrice] = useState('')
  const [series, setSeries] = useState('')
  const [character, setCharacter] = useState('')
  const [dateAcquired, setDateAcquired] = useState(null)
  const [inCollection, setInCollection] = useState('yes')
  const [message, setMessage] = useState('')

  const { addItem } = useAddItem()
  const { userID } = useGetUserID()

  const types = ['image/png', 'image/jpeg', 'image/jpg']

  const onSubmit = e => {
    e.preventDefault()
    addItem({
      userID,
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
    })
      .then(() => {
        setName('')
        setDescription('')
        setType('')
        setBrandOrCreator('')
        setPrice(0)
        setSeries('')
        setCharacter('')
        setDateAcquired(null)
        setInCollection('yes')

        setMessage('Item Uploaded Successfully!')
      })
      .catch(error => {
        setMessage('An error has occurred while uploading.')
        console.error(error)
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
            <h1>Add an Item</h1>
            <h3> *Picture, Item Name, and Description are REQUIRED!* </h3>
          </div>
          <form className='add-item' onSubmit={onSubmit}>
            <p></p>
            <input
              type='file'
              required
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
              required
              value={itemName}
              onChange={e => setName(e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder='Description'
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder='Type'
              value={type}
              onChange={e => setType(e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder='Brand or Creator'
              value={brandOrCreator}
              onChange={e => setBrandOrCreator(e.target.value)}
            />
            <p></p>
            <input
              type='number'
              placeholder='Price'
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder='Series'
              value={series}
              onChange={e => setSeries(e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder='Character'
              value={character}
              onChange={e => setCharacter(e.target.value)}
            />
            <p></p>
            <input
              type='date'
              placeholder='Date Acquired'
              value={dateAcquired}
              onChange={e => setDateAcquired(e.target.value)}
            />
            <p></p>
            In Collection:
            <label>
              <input
                type='radio'
                name='inCollectionRadio'
                value='yes'
                defaultChecked={true}
                onChange={e => setInCollection(e.target.value)}
              />
              Yes
            </label>
            <label>
              <input
                type='radio'
                name='inCollectionRadio'
                value='no'
                onChange={e => setInCollection(e.target.value)}
              />
              No
            </label>
            <p></p>
            <button type='submit'>Add Item</button>
          </form>
        </div>
      </div>
    </>
  )
}

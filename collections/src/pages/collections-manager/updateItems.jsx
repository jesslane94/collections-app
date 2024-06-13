import { useState } from 'react'
import { useAddItem } from '../../hooks/useAddItem'
import { useGetUserID } from '../../hooks/useGetUserID'

import './styles.css'

export const UpdateItems = () => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(null)
  const [itemName, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [brandOrCreator, setBrandOrCreator] = useState('')
  const [price, setPrice] = useState(0)
  const [series, setSeries] = useState('')
  const [character, setCharacter] = useState('')
  const [dateAcquired, setDateAcquired] = useState(null)
  const [inCollection, setInCollection] = useState('yes')

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
        setStatus({ type: 'success' })
      })
      .catch(error => {
        setStatus({ type: 'error', error })
      })

    // file error handling
    if (error) {
      console.error(error)
    }

    setName('')
    setDescription('')
    setType('')
    setBrandOrCreator('')
    setPrice(0)
    setSeries('')
    setCharacter('')
    setDateAcquired(null)
    setInCollection('yes')

    return (
      <>
        {status?.type === 'success' && <p>"Item successfully uploaded!"</p>}
        {status?.type === 'error' && <p>"Something went wrong!"</p>}
      </>
    )
  }

  return (
    <>
      <div className='collections'>
        <br></br>
        <div className='container'>
          <div className='item'>
            <h1>Add an Item</h1>
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
              onChange={e => setName(e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder='Description'
              required
              onChange={e => setDescription(e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder='Type'
              onChange={e => setType(e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder='Brand or Creator'
              onChange={e => setBrandOrCreator(e.target.value)}
            />
            <p></p>
            <input
              type='number'
              placeholder='Price'
              onChange={e => setPrice(e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder='Series'
              onChange={e => setSeries(e.target.value)}
            />
            <p></p>
            <input
              type='text'
              placeholder='Character'
              onChange={e => setCharacter(e.target.value)}
            />
            <p></p>
            <input
              type='date'
              placeholder='Date Acquired'
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

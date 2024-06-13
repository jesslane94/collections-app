import { useState } from 'react'
import { useGetItems } from '../../hooks/useGetItems'
import { useDeleteItem } from '../../hooks/useDeleteItem'
import { useGetUserID } from '../../hooks/useGetUserID'
import { useNavigate } from 'react-router-dom'

import './styles.css'

export const ViewItems = () => {
  const [item, setDeleteItem] = useState(null)

  const { name } = useGetUserID()
  const { items, totalItems } = useGetItems()
  const { deleteItem } = useDeleteItem(item)
  const navigate = useNavigate()

  return (
    <>
      <div className='items'>
        <h1>{name}'s Collection</h1>
        <h2>All {totalItems} Items</h2>
        <ul>
          {items.map(item => {
            const {
              itemName,
              description,
              type,
              brandOrCreator,
              price,
              series,
              character,
              dateAcquired,
              inCollection
            } = item
            return (
              <div className='card' key={item.id}>
                <div className='card-header'> {itemName} </div>
                <div className='card-body'>
                  <p>
                    {' '}
                    <a href={item.downloadUrl}>
                      <img
                        class='picture'
                        src={item.downloadUrl}
                        alt='an item added to the database'
                      />
                    </a>{' '}
                  </p>
                  <p> description: {description} </p>
                  <p> type: {type} </p>
                  <p> brand/creator: {brandOrCreator} </p>
                  <p> price: {price} </p>
                  <p> series: {series} </p>
                  <p> character: {character} </p>
                  <p> date acquired: {dateAcquired} </p>
                  <p> still in collection: {inCollection} </p>
                  <button
                    className='update-item'
                    type='button'
                    onClick={() => {
                      navigate('/updateItem')
                    }}
                  >
                    {' '}
                    Delete Item
                  </button>
                  <button
                    className='delete-item'
                    type='button'
                    onClick={() => {
                      setDeleteItem(item)
                      deleteItem()
                    }}
                  >
                    {' '}
                    Delete Item
                  </button>
                </div>
              </div>
            )
          })}
        </ul>
      </div>
    </>
  )
}

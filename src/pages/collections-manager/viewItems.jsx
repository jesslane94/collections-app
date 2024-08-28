import { useGetItems } from '../../hooks/useGetItems'
import { useDeleteItem } from '../../hooks/useDeleteItem'
import { useGetUserID } from '../../hooks/useGetUserID'
import { useNavigate } from 'react-router-dom'

import './styles.css'

export const ViewItems = () => {
  const { name } = useGetUserID()
  const { items, totalItems } = useGetItems()
  const { deleteItem, message } = useDeleteItem()
  const navigate = useNavigate()

  return (
    <>
      <div className='items'>
        <h1>{name}'s Collection</h1>
        <h2>Showing {totalItems} Items</h2>
        <div className='result'>
          <h2>{message}</h2>
          <p></p>
        </div>
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
                        className='picture'
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
                      navigate(`/updateItem/${item.id}`, {
                        state: { id: item.id }
                      })
                    }}
                  >
                    {' '}
                    Update Item
                  </button>
                  <button
                    className='delete-item'
                    type='button'
                    onClick={() => {
                      deleteItem(item)
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

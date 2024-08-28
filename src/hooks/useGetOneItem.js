// import { useState } from 'react'
import { query, collection, where, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import { useGetUserID } from './useGetUserID'

export const useGetOneItem = itemId => {
  const { userID } = useGetUserID()
  const itemCollection = collection(db, 'items')

  const getOneItem = async id => {
    var itemData = {}
    const q = query(
      itemCollection,
      where('id', '==', itemId),
      where('userID', '==', userID)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
      const data = doc.data()
      itemData = { ...data, id }
    })
    return itemData
  }

  return { getOneItem }
}

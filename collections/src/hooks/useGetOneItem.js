import { useEffect, useState } from 'react'
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore'
import { db } from '../config/firebase-config'

export const useGetOneItem = () => {
  const itemCollection = collection(db, 'items')

  const getOneItem = async id => {}
}

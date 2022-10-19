import React, {useEffect, useState} from 'react'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import {IPostLikes} from '@/interface'

const useLikedPosts = () => {
  const [userLikedPosts, setUserLikedPosts] = useState<IPostLikes[]>([])
  const [error, setError] = useState('')
  const authUserId = auth().currentUser?.uid

  useEffect(() => {
    let unsub: () => void
    try {
      unsub = firestore()
        .collection('Users')
        .doc(authUserId)
        .collection('postlikes')
        .onSnapshot(
          querySnapshot => {
            const dataList: IPostLikes[] = querySnapshot.docs.map(d => ({
              ...(d.data() as IPostLikes),
            }))
            console.log('user likes refetching')
            setUserLikedPosts(dataList)
          },
          error => {
            console.log('user liked data fetching error', error)
          },
        )
    } catch (err) {
      console.log('getLikedposterror', err)
      setError(String(err))
    }

    return () => {
      unsub()
    }
  }, [])

  return {userLikedPosts, error}
}

export default useLikedPosts

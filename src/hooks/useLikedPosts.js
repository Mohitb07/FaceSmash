import React, {useCallback, useEffect, useRef, useState} from 'react'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const useLikedPosts = () => {
  const [userLikedPosts, setUserLikedPosts] = useState([])
  const [error, setError] = useState('')
  const authUserId = auth()?.currentUser?.uid

  const refetch = useCallback(async () => {
    console.log('refetching')
  }, [])

  useEffect(() => {
    try {
      firestore()
        .collection('Users')
        .doc(authUserId)
        .collection('postlikes')
        .onSnapshot(
          querySnapshot => {
            const dataList = querySnapshot.docs.map(d => d.data())
            console.log(
              'query snapshot',
              querySnapshot.docs.map(d => d.data()),
            )
            setUserLikedPosts(dataList)
          },
          error => {
            console.log('user liked data fetching error', error)
          },
        )
    } catch (err) {
      console.log('getLikedposterror', err.message)
      setError(err.message)
    }
  }, [])

  return {userLikedPosts, refetch, error}
}

export default useLikedPosts

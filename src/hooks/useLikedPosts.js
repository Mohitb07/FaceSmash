import React, {useEffect, useState} from 'react'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const useLikedPosts = () => {
  const [userLikedPosts, setUserLikedPosts] = useState([])
  const [error, setError] = useState('')
  const authUserId = auth()?.currentUser?.uid

  useEffect(() => {
    let unsub
    try {
      unsub = firestore()
        .collection('Users')
        .doc(authUserId)
        .collection('postlikes')
        .onSnapshot(
          querySnapshot => {
            const dataList = querySnapshot.docs.map(d => d.data())
            console.log('user likes refetching')
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

    return () => {
      unsub()
    }
  }, [])

  return {userLikedPosts, error}
}

export default useLikedPosts

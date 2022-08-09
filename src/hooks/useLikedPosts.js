import React, {useCallback, useEffect, useRef, useState} from 'react'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const useLikedPosts = () => {
  const [userLikedPosts, setUserLikedPosts] = useState([])
  const [error, setError] = useState('')
  const authUserId = auth()?.currentUser?.uid

  const getUserLikedPosts = useCallback(async () => {
    try {
      const userLikedPosts = await firestore()
        .collection('Users')
        .doc(authUserId)
        .collection('postlikes')
        .get()

      const postsLiked = []

      userLikedPosts.docs.map(doc => postsLiked.push(doc.data()))
      setUserLikedPosts(postsLiked)
    } catch (err) {
      console.log('getLikedposterror', err.message)
      setError(err.message)
    }
  }, [])

  const refetch = useCallback(async () => {
    getUserLikedPosts()
  }, [getUserLikedPosts])

  useEffect(() => {
    getUserLikedPosts()
  }, [getUserLikedPosts])

  return {userLikedPosts, refetch, error}
}

export default useLikedPosts

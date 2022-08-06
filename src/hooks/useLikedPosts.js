import React, {useCallback, useEffect, useRef, useState} from 'react'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const useLikedPosts = () => {
  const [userLikedPosts, setUserLikedPosts] = useState([])
  const [error, setError] = useState('')
  const authUserId = auth()?.currentUser?.uid

  const counter = useRef(0)
  useEffect(() => {
    counter.current = counter.current + 1
  })
  // console.log('useLikedPosts Count ❤️', counter.current)

  const getUserLikedPosts = useCallback(async () => {
    try {
      const userLikedPosts = await firestore()
        .collection('Users')
        .doc(authUserId)
        .collection('postlikes')
        .get()

      const postsLiked = []

      userLikedPosts.docs.map(doc => postsLiked.push(doc.data()))
      // console.log('within postsLiked 🚀', postsLiked, postsLiked.length)
      setUserLikedPosts(postsLiked)
    } catch (err) {
      console.log('getLikedposterror', err.message)
      setError(err.message)
    }
  }, [])

  const refetch = useCallback(async () => {
    getUserLikedPosts()
  }, [getUserLikedPosts])

  // console.log('🚀', userLikedPosts, userLikedPosts.length)

  useEffect(() => {
    getUserLikedPosts()
  }, [getUserLikedPosts])

  return {userLikedPosts, refetch, error}
}

export default useLikedPosts

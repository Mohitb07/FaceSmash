import React, {useCallback, useContext, useEffect, useState} from 'react'

import firestore from '@react-native-firebase/firestore'

import {AuthUserContext} from '../Context/auth'

const useLikedPosts = () => {
  const {authUser} = useContext(AuthUserContext)
  const [userLikedPosts, setUserLikedPosts] = useState([])
  const [error, setError] = useState('')

  const getUserLikedPosts = useCallback(async () => {
    try {
      const userLikedPosts = await firestore()
        .collection('Users')
        .doc(authUser?.uid)
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
  }, [])

  useEffect(() => {
    getUserLikedPosts()
  }, [getUserLikedPosts])

  return {userLikedPosts, refetch, error}
}

export default useLikedPosts

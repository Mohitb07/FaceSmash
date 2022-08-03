import {View, Text} from 'react-native'
import React, {useCallback, useEffect, useState} from 'react'

import firestore from '@react-native-firebase/firestore'
import usePagination from './usePagination'

const LIMIT = 10

const useUserPostsQuery = userId => {
  const [myRecentPosts, setMyRecentPosts] = useState({
    posts: [],
  })
  const [lastVisible, setLastVisible] = useState(null)
  const [loading, setLoading] = useState(true)
  const {retrieveMore} = usePagination()

  useEffect(() => {
    async function fetchUserPosts() {
      const allUserPosts = await firestore()
        .collection('Posts')
        .where('user', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(LIMIT)
        .get()

      const latestPosts = []
      allUserPosts.docs.map(post => {
        latestPosts.push({
          ...post.data(),
          key: post.id,
        })
      })

      let lastVisibleDoc = allUserPosts.docs[allUserPosts.docs.length - 1]

      setMyRecentPosts(prev => ({
        ...prev,
        posts: latestPosts,
      }))
      setLastVisible(lastVisibleDoc)
      setLoading(false)
    }
    fetchUserPosts()
  }, [userId])

  const getMoreData = useCallback(() => {
    return retrieveMore(
      lastVisible,
      setLoading,
      'Posts',
      setLastVisible,
      myRecentPosts,
      setMyRecentPosts,
      true,
      'user',
      '==',
      userId,
    )
  }, [lastVisible])

  return {
    myRecentPosts,
    loading,
    getMoreData,
  }
}

export default useUserPostsQuery

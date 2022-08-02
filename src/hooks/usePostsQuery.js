import React, {useCallback, useEffect, useState} from 'react'
import firestore from '@react-native-firebase/firestore'
import {postState} from '../atoms/postAtom'
import {useRecoilState} from 'recoil'
import useLikedPosts from './useLikedPosts'

const LIMIT = 5

const usePostsQuery = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState)
  const [loading, setLoading] = useState(true)
  const [lastVisible, setLastVisible] = useState(null)
  const {userLikedPosts, refetch} = useLikedPosts()
  const [refreshing, setRefreshing] = useState(false)

  const retrieveMore = useCallback(async () => {
    if (!lastVisible) {
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const allPosts = await firestore()
        .collection('Posts')
        .orderBy('createdAt', 'desc')
        .startAfter(lastVisible)
        .limit(LIMIT)
        .get()

      const latestPost = []
      allPosts.docs.map(item => {
        latestPost.push({
          ...item.data(),
          key: item.id,
        })
      })
      let lastVisibleDoc = allPosts.docs[allPosts.docs.length - 1]
      setPostStateValue(prev => ({
        ...prev,
        posts: [...postStateValue.posts, ...latestPost],
      }))
      setLastVisible(lastVisibleDoc)
      setLoading(false)
    } catch (error) {
      console.log('getPosts error', error)
      setLoading(false)
    }
  }, [lastVisible])

  const getPosts = useCallback(async () => {
    setPostStateValue(prev => ({
      ...prev,
      posts: [],
    }))
    try {
      const allPosts = await firestore()
        .collection('Posts')
        .orderBy('createdAt', 'desc')
        .limit(LIMIT)
        .get()

      const latestPost = []
      allPosts.docs.map(item => {
        latestPost.push({
          ...item.data(),
          key: item.id,
        })
      })

      let lastVisibleDoc = allPosts.docs[allPosts.docs.length - 1]

      setPostStateValue(prev => ({
        ...prev,
        posts: latestPost,
      }))

      setLastVisible(lastVisibleDoc)
      setLoading(false)
    } catch (error) {
      console.log('getPosts error', error)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getPosts()
  }, [getPosts])

  const onRefresh = useCallback(async () => {
    setLoading(true)
    setRefreshing(true)
    await getPosts()
    refetch() //on refresh refetch all liked posts of the current user
    setRefreshing(false)
  }, [])

  return {
    postStateValue,
    loading,
    onRefresh,
    userLikedPosts,
    refreshing,
    retrieveMore,
  }
}

export default usePostsQuery

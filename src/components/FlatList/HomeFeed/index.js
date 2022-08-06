import React, {useEffect, useState} from 'react'
import {useRecoilState} from 'recoil'
import {postState} from '../../../atoms/postAtom'
import useLikedPosts from '../../../hooks/useLikedPosts'
import usePagination from '../../../hooks/usePagination'

import firestore from '@react-native-firebase/firestore'

import DataList from '../../DataList'
import Footer from '../../DataList/DataListFooter'
import EmptyList from '../../DataList/EmptyDataList'
import HomeHeader from '../../Header/Home'

const LIMIT = 5

function HomeFeed({navigation}) {
  const [postStateValue, setPostStateValue] = useRecoilState(postState)
  // const {refetch} = useLikedPosts()
  const [refreshing, setRefreshing] = useState(false)
  const {retrieveMore} = usePagination()
  const {userLikedPosts, refetch} = useLikedPosts()

  // console.log('data list getting 🎯', userLikedPosts, userLikedPosts.length)
  const getPosts = async () => {
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
        lastVisible: lastVisibleDoc,
        loading: false,
      }))
    } catch (error) {
      console.log('getPosts error', error)
      setPostStateValue(prev => ({
        ...prev,
        loading: false,
      }))
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  const onRefresh = async () => {
    setPostStateValue(prev => ({
      ...prev,
      loading: true,
    }))
    setRefreshing(true)
    await getPosts()
    await refetch() //on refresh refetch all liked posts of the current user
    setRefreshing(false)
  }

  const getMoreData = () => {
    return retrieveMore(
      postStateValue.lastVisible,
      'Posts',
      postStateValue.posts,
      setPostStateValue,
    )
  }

  return (
    <DataList
      dataList={postStateValue.posts}
      EmptyList={<EmptyList loading={postStateValue.loading} />}
      Footer={
        <Footer
          dataList={postStateValue.posts}
          loading={postStateValue.loading}
        />
      }
      Header={
        <HomeHeader navigation={navigation} loading={postStateValue.loading} />
      }
      onRefresh={onRefresh}
      refreshing={refreshing}
      retrieveMore={getMoreData}
      loading={postStateValue.loading}
      navigation={navigation}
      userLikedPosts={userLikedPosts}
    />
  )
}

export default React.memo(HomeFeed)

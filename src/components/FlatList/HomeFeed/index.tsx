import React, {useEffect, useState} from 'react'
import {useRecoilState} from 'recoil'

import firestore from '@react-native-firebase/firestore'

import usePagination from '../../../hooks/usePagination'
import {IDefaultPostState, IPost, postState} from '../../../atoms/postAtom'
import useLikedPosts from '../../../hooks/useLikedPosts'
import DataList from './DataList'
import Footer from './DataListFooter'
import EmptyList from './EmptyDataList'
import HomeHeader from '../../Header/Home'

const LIMIT = 5

function HomeFeed() {
  const [postStateValue, setPostStateValue] =
    useRecoilState<IDefaultPostState>(postState)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const {retrieveMore} = usePagination()
  const {userLikedPosts, refetch} = useLikedPosts()
  console.log('user liked posts', userLikedPosts)
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
      const latestPost: Array<IPost> = []
      allPosts.docs.map(item => {
        latestPost.push({
          key: item.id,
          createdAt: {},
          description: '',
          likes: 0,
          title: '',
          user: '',
          userProfile: '',
          username: '',
          ...item.data(),
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
      Header={<HomeHeader />}
      onRefresh={onRefresh}
      refreshing={refreshing}
      retrieveMore={getMoreData}
      loading={postStateValue.loading}
      userLikedPosts={userLikedPosts}
    />
  )
}

export default React.memo(HomeFeed)

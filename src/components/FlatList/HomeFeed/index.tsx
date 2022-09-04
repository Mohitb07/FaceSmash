import React, {useEffect, useState} from 'react'

import firestore from '@react-native-firebase/firestore'

import {IDefaultPostState, IPost} from '../../../atoms/postAtom'
import useLikedPosts from '../../../hooks/useLikedPosts'
import usePagination from '../../../hooks/usePagination'
import DataList from '../../DataList'
import Footer from '../../DataList/DataListFooter'
import EmptyList from '../../DataList/EmptyDataList'
import HomeHeader from '../../Header/Home'

const LIMIT = 5

function HomeFeed() {
  const [postStateValue, setPostStateValue] = useState<IDefaultPostState>({
    loading: true,
    lastVisible: null,
    posts: [],
    selectedPost: null,
  })
  const [refreshing, setRefreshing] = useState(false)
  const {retrieveMore} = usePagination()
  const {userLikedPosts} = useLikedPosts()
  const getPosts = () => {
    try {
      firestore()
        .collection('Posts')
        .orderBy('createdAt', 'desc')
        .limit(LIMIT)
        .onSnapshot(
          snapshot => {
            const postList: Array<IPost> = snapshot.docs.map(d => ({
              key: d.id,
              createdAt: {},
              description: '',
              likes: 0,
              title: '',
              user: '',
              userProfile: '',
              username: '',
              imageRef: '',
              ...d.data(),
            }))
            const lastVisiblePostDoc = snapshot.docs[snapshot.docs.length - 1]
            setPostStateValue(prev => ({
              ...prev,
              posts: postList,
              lastVisible: lastVisiblePostDoc,
              loading: false,
            }))
          },
          error => {
            console.log('home post fetching error', error)
          },
        )
    } catch (error) {
      console.log('getPosts error', error)
      setPostStateValue(prev => ({
        ...prev,
        loading: false,
      }))
    }
  }

  useEffect(() => {
    console.log('fetching firebase posts')
    getPosts()
  }, [])

  const onRefresh = () => {
    try {
      setRefreshing(true)
      getPosts()
    } catch (error) {
      console.log('On Refresh Error:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const getMoreData = () =>
    retrieveMore(
      postStateValue.lastVisible,
      'Posts',
      postStateValue.posts,
      setPostStateValue,
    )
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

export default HomeFeed

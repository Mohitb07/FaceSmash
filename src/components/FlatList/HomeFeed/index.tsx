import React, {useEffect, useState} from 'react'
import {useRecoilState} from 'recoil'

import firestore from '@react-native-firebase/firestore'

import {IDefaultPostState, IPost, postState} from '../../../atoms/postAtom'
import useLikedPosts from '../../../hooks/useLikedPosts'
import usePagination from '../../../hooks/usePagination'
import HomeHeader from '../../Header/Home'
import DataList from '../../DataList'
import Footer from '../../DataList/DataListFooter'
import EmptyList from '../../DataList/EmptyDataList'

const LIMIT = 5

function HomeFeed() {
  // const [postStateValue, setPostStateValue] =
  //   useRecoilState<IDefaultPostState>(postState)
  const [postStateValue, setPostStateValue] = useState<IDefaultPostState>({
    loading: true,
    lastVisible: null,
    posts: [],
    selectedPost: null,
  })
  const [refreshing, setRefreshing] = useState(false)
  const {retrieveMore} = usePagination()
  const {userLikedPosts, refetch} = useLikedPosts()
  const getPosts = () => {
    // setPostStateValue(prev => ({
    //   ...prev,
    //   posts: [],
    // }))
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
    getPosts()
  }, [])

  const onRefresh = async () => {
    try {
      setRefreshing(true)
      setPostStateValue(prev => ({
        ...prev,
        loading: true,
      }))
      getPosts()
      // await refetch() //on refresh refetch all liked posts of the current user
      setRefreshing(false)
    } catch (error) {
      setRefreshing(false)
    }
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

import React, {useCallback, useEffect, useState} from 'react'

import firestore from '@react-native-firebase/firestore'

import usePagination from '@/hooks/usePagination'
import {getLastVisibleDocRef} from '@/utils/getLastVisibleDocRef'
import DataList from '@/components/DataList'
import Footer from '@/components/DataList/DataListFooter'
import EmptyList from '@/components/DataList/EmptyDataList'
import HomeHeader from './Header'
import {IDefaultPostState, IPost} from '@/interface'
import {FEED_LIMIT, POSTS_COLLECTION} from '@/constants'
import Screen from '@/components/Screen'

const Home = () => {
  const [postStateValue, setPostStateValue] = useState<IDefaultPostState>({
    loading: true,
    lastVisible: null,
    posts: [],
  })
  const [refreshing, setRefreshing] = useState(false)
  const {queryMore} = usePagination()
  const getPosts = useCallback(() => {
    const subscriber = firestore()
      .collection(POSTS_COLLECTION)
      .orderBy('createdAt', 'desc')
      .limit(FEED_LIMIT)
      .onSnapshot(
        async snapshot => {
          const postUserPromises = snapshot.docs.map(d => d.data().user.get())
          const rawResult = await Promise.all(postUserPromises)
          const result = rawResult.map(d => d.data())
          const postList: Array<IPost> = snapshot.docs.map((d, index) => ({
            ...(d.data() as IPost),
            username: result[index].username,
            userProfile: result[index].profilePic,
            key: d.id,
          }))
          const lastVisiblePostRef = getLastVisibleDocRef(snapshot)
          setPostStateValue(prev => ({
            ...prev,
            posts: postList,
            lastVisible: lastVisiblePostRef,
            loading: false,
          }))
          setRefreshing(false)
        },
        error => {
          console.log('snapshot home post fetching error', error)
          setPostStateValue(prev => ({
            ...prev,
            loading: false,
          }))
        },
      )
    return subscriber
  }, [])

  useEffect(() => {
    const unsub = getPosts()
    return () => {
      unsub()
    }
  }, [getPosts])

  const onRefresh = () => {
    try {
      setRefreshing(true)
      getPosts()
    } catch (error) {
      console.log('On Refresh Error:', error)
    }
  }

  const getMoreData = async () => {
    setPostStateValue(prev => ({
      ...prev,
      loading: true,
    }))
    try {
      const {paginatedResult, lastVisibleDocRef} = await queryMore(
        postStateValue.lastVisible,
        'Posts',
      )
      setPostStateValue(prev => ({
        ...prev,
        posts: [...postStateValue.posts, ...paginatedResult],
        lastVisible: lastVisibleDocRef,
      }))
    } catch (error) {
      console.error('ERROR while fetching paginated posts home screen', error)
    } finally {
      setPostStateValue(prev => ({
        ...prev,
        loading: false,
      }))
    }
  }
  return (
    <Screen>
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
      />
    </Screen>
  )
}
export default React.memo(Home)

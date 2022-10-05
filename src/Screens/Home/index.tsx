import React, {useCallback, useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'

import firestore from '@react-native-firebase/firestore'

import usePagination from '@/hooks/usePagination'
import {getLastVisibleDocRef} from '@/utils/getLastVisibleDocRef'
import DataList from '@/components/DataList'
import Footer from '@/components/DataList/DataListFooter'
import EmptyList from '@/components/DataList/EmptyDataList'
import HomeHeader from '@/components/Header/Home'
import {IDefaultPostState, IPost} from '@/interface'
import {FEED_LIMIT, POSTS_COLLECTION} from '@/constants'
import {COLORS} from '@/constants'

const Home = () => {
  console.log('calling HomeFeed')
  const [postStateValue, setPostStateValue] = useState<IDefaultPostState>({
    loading: true,
    lastVisible: null,
    posts: [],
  })
  const [refreshing, setRefreshing] = useState(false)
  const {queryMore} = usePagination()
  const getPosts = useCallback(() => {
    console.log('calling getPosts home feed')
    const subscriber = firestore()
      .collection(POSTS_COLLECTION)
      .orderBy('createdAt', 'desc')
      .limit(FEED_LIMIT)
      .onSnapshot(
        snapshot => {
          console.log('calling home feed snapshot')
          const postList: Array<IPost> = snapshot.docs.map(d => ({
            key: d.id,
            createdAt: null,
            description: '',
            likes: 0,
            title: '',
            user: '',
            userProfile: '',
            username: '',
            imageRef: '',
            ...d.data(),
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
        loading: false,
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
    <View style={styles.container}>
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
    </View>
  )
}
export default React.memo(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
  },
})

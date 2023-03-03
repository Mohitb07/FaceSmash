import React, {useEffect, useState} from 'react'

import firestore from '@react-native-firebase/firestore'

import DataList from '@/components/DataList'
import Footer from '@/components/DataList/DataListFooter'
import EmptyList from '@/components/DataList/EmptyDataList'
import HomeHeader from './Header'
import {FEED_LIMIT, POSTS_COLLECTION} from '@/constants'
import Screen from '@/components/Screen'
import useGetPosts from '@/hooks/useGetPosts'

const query = firestore()
  .collection(POSTS_COLLECTION)
  .orderBy('createdAt', 'desc')
  .limit(FEED_LIMIT)

const Home = () => {
  const {getInitialPosts, getMoreData, posts} = useGetPosts()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const unsubscribe = getInitialPosts(query)
    return () => {
      unsubscribe()
    }
  }, [getInitialPosts])

  const onRefresh = () => {
    try {
      setRefreshing(true)
    } catch (error) {
      console.log('On Refresh Error:', error)
    }
  }

  const retrieveMore = () => getMoreData(query)

  return (
    <Screen>
      <DataList
        dataList={posts.data}
        EmptyList={<EmptyList loading={posts.loading} />}
        Footer={
          <Footer
            dataListSize={posts.data.length}
            isLoading={posts.loading}
            hasNext={!!posts.lastVisible}
          />
        }
        Header={<HomeHeader />}
        onRefresh={onRefresh}
        refreshing={refreshing}
        retrieveMore={retrieveMore}
      />
    </Screen>
  )
}
export default React.memo(Home)

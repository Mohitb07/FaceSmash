import React, {useEffect, useState, useRef} from 'react'

import {Spinner} from 'native-base'
import firestore from '@react-native-firebase/firestore'

import DataList from '@/components/DataList'
import DataListFooter from '@/components/DataList/DataListFooter'
import EmptyDataList from '@/components/DataList/EmptyDataList'
import ProfileHeader from '../Header'
import {FEED_LIMIT, POSTS_COLLECTION} from '@/constants'
import Screen from '@/components/Screen'
import useGetPosts from '@/hooks/useGetPosts'

type ProfileContentProps = {
  userId: string
}

const getUserPostQuery = (userId: string) => {
  const query = firestore()
    .collection(POSTS_COLLECTION)
    .where('uid', '==', userId)
    .orderBy('createdAt', 'desc')
    .limit(FEED_LIMIT)
  return query
}

const ProfileContent = ({userId}: ProfileContentProps) => {
  const [totalUserPosts, setTotalUserPosts] = useState(0)
  const {getInitialPosts, posts, getMoreData} = useGetPosts()
  const initialLoad = useRef(true)

  useEffect(() => {
    initialLoad.current = false
    const unsubscribe = getInitialPosts(getUserPostQuery(userId))
    return () => {
      console.log('unmounting profile screen')
      unsubscribe()
    }
  }, [getInitialPosts, userId])

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(POSTS_COLLECTION)
      .where('uid', '==', userId)
      .onSnapshot(snapshot => setTotalUserPosts(snapshot.docs.length))
    return () => unsubscribe()
  }, [userId])

  if (initialLoad.current && posts.loading) {
    return (
      <Screen justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Screen>
    )
  }

  const retrieveMore = () => getMoreData(getUserPostQuery(userId))

  return (
    <DataList
      key={userId}
      dataList={posts.data}
      Header={<ProfileHeader totalPosts={totalUserPosts} userId={userId} />}
      EmptyList={<EmptyDataList loading={posts.loading} />}
      Footer={
        <DataListFooter
          dataListSize={posts.data.length}
          isLoading={posts.loading}
          hasNext={!!posts.lastVisible}
        />
      }
      retrieveMore={retrieveMore}
    />
  )
}

export default React.memo(ProfileContent)

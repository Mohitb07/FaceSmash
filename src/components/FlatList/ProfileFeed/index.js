import React, {useCallback, useEffect, useRef} from 'react'

import firestore from '@react-native-firebase/firestore'
import {useRecoilState} from 'recoil'
import {userDataState} from '../../../atoms/userAtom'
import useLikedPosts from '../../../hooks/useLikedPosts'
import usePagination from '../../../hooks/usePagination'
import DataList from '../../DataList'
import Footer from '../../DataList/DataListFooter'
import EmptyList from '../../DataList/EmptyDataList'
import ProfileHeader from '../../Header/Profile'

const LIMIT = 5

const ProfileFeed = ({userId, navigation}) => {
  const [myRecentPosts, setMyRecentPosts] = useRecoilState(userDataState)
  const {retrieveMore} = usePagination()
  const {userLikedPosts} = useLikedPosts()

  const counterRef = useRef(0)
  useEffect(() => {
    counterRef.current = counterRef.current + 1
  })

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
        posts: latestPosts,
        loading: false,
        lastVisible: lastVisibleDoc,
      }))
    }
    fetchUserPosts()
  }, [userId])

  const getMoreData = useCallback(() => {
    return retrieveMore(
      myRecentPosts.lastVisible,
      'Posts',
      myRecentPosts.posts,
      setMyRecentPosts,
      true,
      'user',
      '==',
      userId,
    )
  }, [myRecentPosts.lastVisible])

  console.log('profile feed counter', counterRef.current)

  const MemoizedHeader = useCallback(
    () => (
      <ProfileHeader
        totalPosts={myRecentPosts.posts?.length}
        userId={userId}
        navigation={navigation}
      />
    ),
    [userId, myRecentPosts.posts?.length],
  )

  const MemoizedFooter = useCallback(
    () => (
      <Footer dataList={myRecentPosts.posts} loading={myRecentPosts.loading} />
    ),
    [myRecentPosts.loading, myRecentPosts.posts?.length],
  )

  const MemoizedEmptyList = useCallback(
    () => <EmptyList loading={myRecentPosts.loading} />,
    [myRecentPosts.loading],
  )

  return (
    <DataList
      dataList={myRecentPosts.posts}
      EmptyList={<MemoizedEmptyList />}
      Footer={<MemoizedFooter />}
      Header={<MemoizedHeader />}
      // onRefresh={onRefresh}
      // refreshing={refreshing}
      retrieveMore={getMoreData}
      loading={myRecentPosts.loading}
      navigation={navigation}
      userLikedPosts={userLikedPosts}
    />
  )
}

export default ProfileFeed

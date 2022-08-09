import React, {useCallback, useEffect} from 'react'

import firestore from '@react-native-firebase/firestore'
import {useRecoilState} from 'recoil'
import {IPost} from '../../../atoms/postAtom'
import {IDefaultUserDataState, userDataState} from '../../../atoms/userAtom'
import useLikedPosts from '../../../hooks/useLikedPosts'
import usePagination from '../../../hooks/usePagination'
import DataList from '../../DataList'

const LIMIT = 5

const ProfileFeed = ({userId}: {userId: string}) => {
  const [myRecentPosts, setMyRecentPosts] =
    useRecoilState<IDefaultUserDataState>(userDataState)
  const {retrieveMore} = usePagination()
  const {userLikedPosts} = useLikedPosts()

  useEffect(() => {
    if (myRecentPosts.posts[0]?.user !== userId) {
      setMyRecentPosts(prev => ({
        ...prev,
        posts: [],
        loading: true,
      }))
    }
    async function fetchUserPosts() {
      console.log(
        'fetching user posts................................................................',
      )
      const allUserPosts = await firestore()
        .collection('Posts')
        .where('user', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(LIMIT)
        .get()

      const latestPosts: Array<IPost> = []
      allUserPosts.docs.map(post => {
        latestPosts.push({
          key: post.id,
          createdAt: {},
          description: '',
          likes: 0,
          title: '',
          user: '',
          userProfile: '',
          username: '',
          ...post.data(),
        })
      })

      let lastVisibleDoc = allUserPosts.docs[allUserPosts.docs.length - 1]
      setMyRecentPosts(prev => ({
        ...prev,
        posts: latestPosts,
        loading: false,
        lastVisible: lastVisibleDoc,
      }))
    }
    fetchUserPosts()

    return () => console.log('unmount')
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

  // const MemoizedHeader = useCallback(
  //   () => (
  //     <ProfileHeader totalPosts={myRecentPosts.posts?.length} userId={userId} />
  //   ),
  //   [userId, myRecentPosts.posts?.length],
  // )

  // const MemoizedFooter = useCallback(
  //   () => (
  //     <Footer dataList={myRecentPosts.posts} loading={myRecentPosts.loading} />
  //   ),
  //   [myRecentPosts.loading, myRecentPosts.posts?.length],
  // )

  // const MemoizedEmptyList = useCallback(
  //   () => <EmptyList loading={myRecentPosts.loading} />,
  //   [myRecentPosts.loading],
  // )

  return (
    <DataList
      key={userId}
      dataList={myRecentPosts.posts}
      // EmptyList={<MemoizedEmptyList />}
      // Footer={<MemoizedFooter />}
      // Header={<MemoizedHeader />}
      // onRefresh={onRefresh}
      // refreshing={refreshing}
      retrieveMore={getMoreData}
      loading={myRecentPosts.loading}
      userLikedPosts={userLikedPosts}
      userId={userId}
    />
  )
}

export default React.memo(ProfileFeed)

import React, {useCallback, useEffect} from 'react'

import firestore from '@react-native-firebase/firestore'
import {useRecoilState} from 'recoil'
import {IDefaultUserDataState, userDataState} from '../../../atoms/userAtom'
import useLikedPosts from '../../../hooks/useLikedPosts'
import usePagination from '../../../hooks/usePagination'
import DataList from '../../DataList'
import Loader from '../../Loader'

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
    function fetchUserPosts() {
      firestore()
        .collection('Posts')
        .where('user', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(LIMIT)
        .onSnapshot(
          querySnapshot => {
            const dataList = querySnapshot.docs.map(d => ({
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
            let lastVisibleDoc =
              querySnapshot.docs[querySnapshot.docs.length - 1]
            console.log('lastVisibleDoc', lastVisibleDoc)
            setMyRecentPosts(prev => ({
              ...prev,
              posts: dataList,
              loading: false,
              lastVisible: lastVisibleDoc,
            }))
          },
          error => {
            console.log('fetchUserPosts error: ', error)
          },
        )
    }
    fetchUserPosts()
  }, [])

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

  return myRecentPosts.posts.length > 0 ? (
    <DataList
      key={userId}
      dataList={myRecentPosts.posts}
      // onRefresh={onRefresh}
      // refreshing={refreshing}
      retrieveMore={getMoreData}
      loading={myRecentPosts.loading}
      userLikedPosts={userLikedPosts}
      userId={userId}
    />
  ) : (
    <Loader />
  )
}

export default React.memo(ProfileFeed)

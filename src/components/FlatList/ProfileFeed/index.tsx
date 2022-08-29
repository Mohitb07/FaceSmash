import React, {useCallback, useEffect, useRef, useState} from 'react'

import firestore from '@react-native-firebase/firestore'
import {useRecoilState} from 'recoil'
import {IDefaultUserDataState, userDataState} from '../../../atoms/userAtom'
import useLikedPosts from '../../../hooks/useLikedPosts'
import usePagination from '../../../hooks/usePagination'
import DataList from '../../DataList'
import DataListFooter from '../../DataList/DataListFooter'
import EmptyDataList from '../../DataList/EmptyDataList'
import ProfileHeader from '../../Header/Profile'

const LIMIT = 5

const ProfileFeed = ({userId}: {userId: string}) => {
  // const [myRecentPosts, setMyRecentPosts] =
  //   useRecoilState<IDefaultUserDataState>(userDataState)
  const {retrieveMore} = usePagination()
  const {userLikedPosts} = useLikedPosts()
  const [myRecentPosts, setMyRecentPosts] = useState<IDefaultUserDataState>({
    posts: [],
    loading: true,
    lastVisible: null,
    postsLikes: [],
  })
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    // if (myRecentPosts.posts[0]?.user !== userId) {
    //   setMyRecentPosts(prev => ({
    //     ...prev,
    //     posts: [],
    //     loading: true,

    //   }))
    // }
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
          let lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
          console.log('inside profile useEffect')
          isMounted.current &&
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

    return () => {
      isMounted.current = false
    }
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

  return (
    <DataList
      key={userId}
      dataList={myRecentPosts.posts}
      // onRefresh={onRefresh}
      // refreshing={refreshing}
      Header={
        <ProfileHeader
          totalPosts={myRecentPosts.posts?.length}
          userId={userId}
        />
      }
      EmptyList={<EmptyDataList loading={myRecentPosts.loading} />}
      Footer={
        <DataListFooter
          dataList={myRecentPosts.posts}
          loading={myRecentPosts.loading}
        />
      }
      retrieveMore={getMoreData}
      loading={myRecentPosts.loading}
      userLikedPosts={userLikedPosts}
    />
  )
}

export default React.memo(ProfileFeed)

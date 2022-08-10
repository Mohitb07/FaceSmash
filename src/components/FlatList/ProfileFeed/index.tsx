import React, {useCallback, useEffect, useState} from 'react'
import {InteractionManager} from 'react-native'

import firestore from '@react-native-firebase/firestore'
import {useRecoilState} from 'recoil'
import {IPost} from '../../../atoms/postAtom'
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
    InteractionManager.runAfterInteractions(() => {
      async function fetchUserPosts() {
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
    })
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

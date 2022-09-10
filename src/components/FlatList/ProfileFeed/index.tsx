import React, {useEffect, useState, useRef, useCallback} from 'react'
import {Spinner, View} from 'native-base'

import firestore from '@react-native-firebase/firestore'

import {IDefaultUserDataState} from '../../../atoms/userAtom'
import usePagination from '../../../hooks/usePagination'
import DataList from '../../DataList'
import DataListFooter from '../../DataList/DataListFooter'
import EmptyDataList from '../../DataList/EmptyDataList'
import ProfileHeader from '../../Header/Profile'
import {IPost} from '../../../atoms/postAtom'
import {getLastVisibleDocRef} from '../../../utils/getLastVisibleDocRef'

const LIMIT = 5

const ProfileFeed = ({userId}: {userId: string}) => {
  const {retrieveMore} = usePagination()

  const [totalUserPosts, setTotalUserPosts] = useState(0)
  const [myRecentPosts, setMyRecentPosts] = useState<IDefaultUserDataState>({
    posts: [],
    loading: true,
    lastVisible: null,
  })
  const initialLoad = useRef(true)

  const getPosts = useCallback(() => {
    const query = firestore()
      .collection('Posts')
      .where('user', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(LIMIT)

    const onsub = query.onSnapshot(
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
        const lastVisiblePostRef = getLastVisibleDocRef(snapshot)
        setMyRecentPosts(prev => ({
          ...prev,
          posts: postList,
          loading: false,
          lastVisible: lastVisiblePostRef,
        }))
      },
      error => {
        console.log('fetchUserPosts error: ', error)
        setMyRecentPosts(prev => ({
          ...prev,
          posts: [],
          loading: false,
          lastVisible: null,
        }))
      },
    )

    return onsub
  }, [userId])

  useEffect(() => {
    initialLoad.current = false
    const onsub = getPosts()
    return () => {
      console.log('unmounting profile screen')
      onsub()
    }
  }, [getPosts])

  useEffect(() => {
    const unsub = firestore()
      .collection('Posts')
      .where('user', '==', userId)
      .onSnapshot(snapshot => {
        setTotalUserPosts(snapshot.docs.length)
      })
    return () => {
      unsub()
    }
  }, [userId])

  const getMoreData = () =>
    retrieveMore(
      myRecentPosts.lastVisible,
      'Posts',
      myRecentPosts.posts,
      setMyRecentPosts,
      true,
      'user',
      '==',
      userId,
    )

  if (initialLoad.current && myRecentPosts.loading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Spinner />
      </View>
    )
  }
  return (
    <DataList
      key={userId}
      dataList={myRecentPosts.posts}
      Header={<ProfileHeader totalPosts={totalUserPosts} userId={userId} />}
      EmptyList={<EmptyDataList loading={myRecentPosts.loading} />}
      Footer={
        <DataListFooter
          dataList={myRecentPosts.posts}
          loading={myRecentPosts.loading}
        />
      }
      retrieveMore={getMoreData}
      loading={myRecentPosts.loading}
    />
  )
}

export default ProfileFeed

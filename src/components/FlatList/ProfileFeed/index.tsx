import React, {useEffect, useState} from 'react'
import {View, Text} from 'react-native'
import {Spinner} from 'native-base'

import firestore from '@react-native-firebase/firestore'

import {IDefaultUserDataState} from '../../../atoms/userAtom'
import useLikedPosts from '../../../hooks/useLikedPosts'
import usePagination from '../../../hooks/usePagination'
import DataList from '../../DataList'
import DataListFooter from '../../DataList/DataListFooter'
import EmptyDataList from '../../DataList/EmptyDataList'
import ProfileHeader from '../../Header/Profile'
import {IPost} from '../../../atoms/postAtom'
import Loader from '../../Loader'

const LIMIT = 5

const ProfileFeed = ({userId}: {userId: string}) => {
  const {retrieveMore} = usePagination()
  const {userLikedPosts} = useLikedPosts()
  const [totalUserPosts, setTotalUserPosts] = useState(0)
  const [myRecentPosts, setMyRecentPosts] = useState<IDefaultUserDataState>({
    posts: [],
    loading: true,
    lastVisible: null,
  })
  const getPosts = () => {
    console.log('inside post effect')
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
        let lastVisiblePostDoc = snapshot.docs[snapshot.docs.length - 1]
        console.log('inside profile useEffect')
        setMyRecentPosts(prev => ({
          ...prev,
          posts: postList,
          loading: false,
          lastVisible: lastVisiblePostDoc,
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
  }

  useEffect(() => {
    const onsub = getPosts()
    return () => {
      console.log('unmouning prfo')
      onsub()
    }
  }, [])

  useEffect(() => {
    console.log('inside length effect')
    const unsub = firestore()
      .collection('Posts')
      .where('user', '==', userId)
      .onSnapshot(snapshot => {
        setTotalUserPosts(snapshot.docs.length)
      })
    return () => {
      unsub()
    }
  }, [])

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

  if (myRecentPosts.loading) {
    return (
      <View style={{flex: 1}}>
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
      userLikedPosts={userLikedPosts}
    />
  )
}

export default React.memo(ProfileFeed)

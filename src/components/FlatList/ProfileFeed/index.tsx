import React, {useEffect, useState, useRef, useCallback} from 'react'
import {Spinner, View} from 'native-base'

import firestore from '@react-native-firebase/firestore'

import usePagination from '../../../hooks/usePagination'
import DataList from '../../DataList'
import DataListFooter from '../../DataList/DataListFooter'
import EmptyDataList from '../../DataList/EmptyDataList'
import ProfileHeader from '../../Header/Profile'
import {getLastVisibleDocRef} from '../../../utils/getLastVisibleDocRef'
import {IDefaultUserDataState, IPost} from '../../../interface'
import {FEED_LIMIT} from '../../../constants'

const ProfileFeed = ({userId}: {userId: string}) => {
  const {queryMoreFilter} = usePagination()

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
      .limit(FEED_LIMIT)

    const onsub = query.onSnapshot(
      snapshot => {
        const postList: Array<IPost> = snapshot.docs.map(d => ({
          key: d.id,
          createdAt: null,
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
        setMyRecentPosts({
          posts: [],
          loading: false,
          lastVisible: null,
        })
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

  const getMoreData = async () => {
    setMyRecentPosts(prev => ({
      ...prev,
      loading: true,
    }))
    try {
      const {paginatedResult, lastVisibleDocRef} = await queryMoreFilter(
        myRecentPosts.lastVisible,
        'Posts',
        'user',
        '==',
        userId,
      )
      setMyRecentPosts(prev => ({
        ...prev,
        posts: [...myRecentPosts.posts, ...paginatedResult],
        loading: false,
        lastVisible: lastVisibleDocRef,
      }))
    } catch (error) {
      console.error('ERROR while fetching paginated posts home screen', error)
    } finally {
      setMyRecentPosts(prev => ({
        ...prev,
        loading: false,
      }))
    }
  }

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
    />
  )
}

export default ProfileFeed

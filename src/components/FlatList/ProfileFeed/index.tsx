import React, {useEffect, useState, useRef, useCallback} from 'react'

import {Spinner, View} from 'native-base'
import firestore from '@react-native-firebase/firestore'

import usePagination from '@/hooks/usePagination'
import DataList from '@/components/DataList'
import DataListFooter from '@/components/DataList/DataListFooter'
import EmptyDataList from '@/components/DataList/EmptyDataList'
import ProfileHeader from '@/components/ScreenHeaders/Profile'
import {getLastVisibleDocRef} from '@/utils/getLastVisibleDocRef'
import {IDefaultUserDataState, IPost} from '@/interface'
import {FEED_LIMIT, POSTS_COLLECTION} from '@/constants'

const ProfileFeed = ({userId}: {userId: string}) => {
  const {queryMoreFilter} = usePagination()
  const [totalUserPosts, setTotalUserPosts] = useState(0)
  const [allUserPosts, setAllUserPosts] = useState<IDefaultUserDataState>({
    posts: [],
    loading: true,
    lastVisible: null,
  })
  const initialLoad = useRef(true)

  const getPosts = useCallback(() => {
    const query = firestore()
      .collection(POSTS_COLLECTION)
      .where('user', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(FEED_LIMIT)

    const subscriber = query.onSnapshot(
      snapshot => {
        const postList: Array<IPost> = snapshot.docs.map(d => ({
          ...(d.data() as IPost),
          key: d.id,
        }))
        const lastVisiblePostRef = getLastVisibleDocRef(snapshot)
        setAllUserPosts(prev => ({
          ...prev,
          posts: postList,
          loading: false,
          lastVisible: lastVisiblePostRef,
        }))
      },
      error => {
        console.log('fetchUserPosts error: ', error)
        setAllUserPosts({
          posts: [],
          loading: false,
          lastVisible: null,
        })
      },
    )
    return subscriber
  }, [userId])

  useEffect(() => {
    initialLoad.current = false
    const unsubscribe = getPosts()
    return () => {
      console.log('unmounting profile screen')
      unsubscribe()
    }
  }, [getPosts])

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(POSTS_COLLECTION)
      .where('user', '==', userId)
      .onSnapshot(snapshot => {
        setTotalUserPosts(snapshot.docs.length)
      })
    return () => {
      unsubscribe()
    }
  }, [userId])

  const getMoreData = async () => {
    setAllUserPosts(prev => ({
      ...prev,
      loading: true,
    }))
    try {
      const {paginatedResult, lastVisibleDocRef} = await queryMoreFilter(
        allUserPosts.lastVisible,
        'Posts',
        'user',
        '==',
        userId,
      )
      setAllUserPosts(prev => ({
        ...prev,
        posts: [...allUserPosts.posts, ...paginatedResult],
        loading: false,
        lastVisible: lastVisibleDocRef,
      }))
    } catch (error) {
      console.error('ERROR while fetching paginated posts home screen', error)
    } finally {
      setAllUserPosts(prev => ({
        ...prev,
        loading: false,
      }))
    }
  }

  if (initialLoad.current && allUserPosts.loading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Spinner />
      </View>
    )
  }
  return (
    <DataList
      key={userId}
      dataList={allUserPosts.posts}
      Header={<ProfileHeader totalPosts={totalUserPosts} userId={userId} />}
      EmptyList={<EmptyDataList loading={allUserPosts.loading} />}
      Footer={
        <DataListFooter
          dataList={allUserPosts.posts}
          loading={allUserPosts.loading}
        />
      }
      retrieveMore={getMoreData}
    />
  )
}

export default React.memo(ProfileFeed)

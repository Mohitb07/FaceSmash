import React, {useEffect, useState, useRef, useCallback} from 'react'

import {Spinner} from 'native-base'
import firestore from '@react-native-firebase/firestore'

import usePagination from '@/hooks/usePagination'
import DataList from '@/components/DataList'
import DataListFooter from '@/components/DataList/DataListFooter'
import EmptyDataList from '@/components/DataList/EmptyDataList'
import ProfileHeader from '../Header'
import {getLastVisibleDocRef} from '@/utils/getLastVisibleDocRef'
import {IDefaultUserDataState, IPost} from '@/interface'
import {FEED_LIMIT, POSTS_COLLECTION} from '@/constants'
import Screen from '@/components/Screen'

type ProfileFeedProps = {
  userId: string
}

const ProfileFeed = ({userId}: ProfileFeedProps) => {
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
      .where('uid', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(FEED_LIMIT)

    const subscriber = query.onSnapshot(
      async snapshot => {
        const postUserPromises = snapshot.docs.map(d => d.data().user.get())
        const rawResult = await Promise.all(postUserPromises)
        const result = rawResult.map(d => d.data())
        const postList: Array<IPost> = snapshot.docs.map((d, index) => ({
          ...(d.data() as IPost),
          username: result[index].username,
          userProfile: result[index].profilePic,
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
        setAllUserPosts(prev => ({
          ...prev,
          loading: false,
          lastVisible: null,
        }))
      },
    )
    return () => subscriber()
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
      .where('uid', '==', userId)
      .onSnapshot(snapshot => setTotalUserPosts(snapshot.docs.length))
    return () => unsubscribe()
  }, [userId])

  const getMoreData = async () => {
    setAllUserPosts(prev => ({
      ...prev,
      loading: true,
    }))
    try {
      const {paginatedResult, lastVisibleDocRef} = await queryMoreFilter(
        allUserPosts.lastVisible,
        POSTS_COLLECTION,
        'uid',
        '==',
        userId,
      )
      setAllUserPosts(prev => ({
        ...prev,
        posts: [...allUserPosts.posts, ...paginatedResult],
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
      <Screen justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Screen>
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

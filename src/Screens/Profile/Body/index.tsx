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

type ProfileContentProps = {
  userId: string
}

const getUserPostQuery = (userId: string) => {
  const query = firestore()
    .collection(POSTS_COLLECTION)
    .where('uid', '==', userId)
    .orderBy('createdAt', 'desc')
    .limit(FEED_LIMIT)
  return query
}

const ProfileContent = ({userId}: ProfileContentProps) => {
  const {paginate} = usePagination()
  const [totalUserPosts, setTotalUserPosts] = useState(0)
  const [userPosts, setUserPosts] = useState<IDefaultUserDataState>({
    posts: [],
    loading: true,
    lastVisible: null,
  })
  const initialLoad = useRef(true)

  const getPosts = useCallback(() => {
    const query = getUserPostQuery(userId)
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
        setUserPosts(prev => ({
          ...prev,
          posts: postList,
          loading: false,
          lastVisible: lastVisiblePostRef,
        }))
      },
      error => {
        console.log('fetchUserPosts error: ', error)
        setUserPosts(prev => ({
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
    setUserPosts(prev => ({
      ...prev,
      loading: true,
    }))
    try {
      if (!userPosts.lastVisible) {
        return
      }
      const query = getUserPostQuery(userId)
      const {paginatedResult, lastVisibleDocRef} = await paginate(
        query.startAfter(userPosts.lastVisible),
      )
      setUserPosts(prev => ({
        ...prev,
        posts: [...userPosts.posts, ...paginatedResult],
        lastVisible: lastVisibleDocRef,
      }))
    } catch (error) {
      console.error('ERROR while fetching paginated posts home screen', error)
    } finally {
      setUserPosts(prev => ({
        ...prev,
        loading: false,
      }))
    }
  }

  if (initialLoad.current && userPosts.loading) {
    return (
      <Screen justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Screen>
    )
  }

  return (
    <DataList
      key={userId}
      dataList={userPosts.posts}
      Header={<ProfileHeader totalPosts={totalUserPosts} userId={userId} />}
      EmptyList={<EmptyDataList loading={userPosts.loading} />}
      Footer={
        <DataListFooter
          dataList={userPosts.posts}
          isLoading={userPosts.loading}
          hasNext={!!userPosts.lastVisible}
        />
      }
      retrieveMore={getMoreData}
    />
  )
}

export default React.memo(ProfileContent)

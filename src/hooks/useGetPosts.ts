import {FeedState, IPost} from '@/interface'
import {getLastVisibleDocRef} from '@/utils/getLastVisibleDocRef'
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore'
import {useCallback, useState} from 'react'
import usePagination from './usePagination'

type QueryProps =
  FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>

export default function useGetPosts() {
  const [posts, setPosts] = useState<FeedState>({
    data: [],
    loading: true,
    lastVisible: null,
  })
  const {paginate} = usePagination()

  const getInitialPosts = useCallback((query: QueryProps) => {
    const subscriber = query.onSnapshot(
      async snapshot => {
        const postUserPromises = snapshot.docs.map(d => d.data().user.get())
        const rawResult = await Promise.all(postUserPromises)
        const result = rawResult.map(d => d.data())
        const postList: IPost[] = snapshot.docs.map((d, index) => ({
          ...(d.data() as IPost),
          username: result[index].username,
          userProfile: result[index].profilePic,
          key: d.id,
        }))
        const lastVisiblePostRef = getLastVisibleDocRef(snapshot)
        setPosts(prev => ({
          ...prev,
          data: postList,
          loading: false,
          lastVisible: lastVisiblePostRef,
        }))
      },
      error => {
        console.log('getInitialPosts error: ', error)
        setPosts(prev => ({
          ...prev,
          loading: false,
          lastVisible: null,
        }))
      },
    )
    return subscriber
  }, [])

  const getMoreData = async (query: QueryProps) => {
    setPosts(prev => ({
      ...prev,
      loading: true,
    }))
    try {
      if (!posts.lastVisible) {
        return
      }
      const {paginatedResult, lastVisibleDocRef} = await paginate(
        query.startAfter(posts.lastVisible),
        posts.lastVisible,
      )
      setPosts(prev => ({
        ...prev,
        data: [...posts.data, ...paginatedResult],
        lastVisible: lastVisibleDocRef,
      }))
    } catch (error) {
      console.error('getMoreData error', error)
    } finally {
      setPosts(prev => ({
        ...prev,
        loading: false,
      }))
    }
  }

  return {getInitialPosts, posts, getMoreData}
}

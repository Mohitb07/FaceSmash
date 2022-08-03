import firestore from '@react-native-firebase/firestore'
import {useCallback} from 'react'

const LIMIT = 10

const usePagination = () => {
  const retrieveMore = useCallback(
    async (
      lastVisible,
      setLoading,
      collection,
      setLastVisible,
      getterData,
      setter,
      where = false,
      arg1 = '',
      arg2 = '',
      arg3 = '',
    ) => {
      console.log('calling')
      if (!lastVisible) {
        // setLoading(false)
        return
      }
      setLoading(true)
      let dataList
      try {
        if (where) {
          dataList = await firestore()
            .collection(collection)
            .where(arg1, arg2, arg3)
            .orderBy('createdAt', 'desc')
            .startAfter(lastVisible)
            .limit(LIMIT)
            .get()
        } else {
          dataList = await firestore()
            .collection(collection)
            .orderBy('createdAt', 'desc')
            .startAfter(lastVisible)
            .limit(LIMIT)
            .get()
        }
        const latestPost = []
        dataList.docs.map(item => {
          latestPost.push({
            ...item.data(),
            key: item.id,
          })
        })
        let lastVisibleDoc = dataList.docs[dataList.docs.length - 1]
        setter(prev => ({
          ...prev,
          posts: [...getterData.posts, ...latestPost],
        }))
        setLastVisible(lastVisibleDoc)
        setLoading(false)
      } catch (error) {
        console.log('getPosts error', error)
        setLoading(false)
      }
    },
    [],
  )

  return {retrieveMore}
}

export default usePagination

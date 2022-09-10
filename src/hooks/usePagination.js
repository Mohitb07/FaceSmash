import firestore from '@react-native-firebase/firestore'
import {useCallback} from 'react'

const LIMIT = 5

const usePagination = () => {
  const retrieveMore = useCallback(
    async (
      lastVisible,
      collection,
      getterData,
      setter,
      where = false,
      arg1 = '',
      arg2 = '',
      arg3 = '',
    ) => {
      console.log('calling')
      if (!lastVisible) {
        return
      }
      setter(prev => ({
        ...prev,
        loading: true,
      }))
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
          posts: [...getterData, ...latestPost],
          loading: false,
          lastVisible: lastVisibleDoc,
        }))
      } catch (error) {
        console.log('getPosts error', error)
        setter(prev => ({
          ...prev,
          loading: false,
        }))
      }
    },
    [],
  )

  return {retrieveMore}
}

export default usePagination

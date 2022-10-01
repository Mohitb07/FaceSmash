import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'

import {FEED_LIMIT} from '@/constants'
import {IPost} from '@/interface'
import {getLastVisibleDocRef} from '@/utils/getLastVisibleDocRef'

const usePagination = () => {
  const queryMore = async (
    lastVisibleDoc: FirebaseFirestoreTypes.DocumentData | null,
    collection: string,
  ): Promise<{
    paginatedResult: IPost[]
    lastVisibleDocRef: FirebaseFirestoreTypes.DocumentData | null
  }> => {
    if (!lastVisibleDoc) {
      return {paginatedResult: [], lastVisibleDocRef: null}
    }

    const queryResult = await firestore()
      .collection(collection)
      .orderBy('createdAt', 'desc')
      .startAfter(lastVisibleDoc)
      .limit(FEED_LIMIT)
      .get()
    const paginatedResult = queryResult.docs.map(doc => ({
      createdAt: null,
      description: '',
      likes: 0,
      title: '',
      user: '',
      userProfile: '',
      username: '',
      imageRef: '',
      ...doc.data(),
      key: doc.id,
    }))
    const lastVisibleDocRef = getLastVisibleDocRef(queryResult)

    return {paginatedResult, lastVisibleDocRef}
  }

  const queryMoreFilter = async (
    lastVisibleDoc: FirebaseFirestoreTypes.DocumentData | null,
    collection: string,
    arg1: string,
    arg2: FirebaseFirestoreTypes.WhereFilterOp,
    arg3: string,
  ): Promise<{
    paginatedResult: IPost[]
    lastVisibleDocRef: FirebaseFirestoreTypes.DocumentData | null
  }> => {
    if (!lastVisibleDoc) {
      return {paginatedResult: [], lastVisibleDocRef: null}
    }

    const queryResult = await firestore()
      .collection(collection)
      .where(arg1, arg2, arg3)
      .orderBy('createdAt', 'desc')
      .startAfter(lastVisibleDoc)
      .limit(FEED_LIMIT)
      .get()
    const paginatedResult = queryResult.docs.map(doc => ({
      createdAt: null,
      description: '',
      likes: 0,
      title: '',
      user: '',
      userProfile: '',
      username: '',
      imageRef: '',
      ...doc.data(),
      key: doc.id,
    }))
    const lastVisibleDocRef = getLastVisibleDocRef(queryResult)

    return {paginatedResult, lastVisibleDocRef}
  }

  return {queryMore, queryMoreFilter}
}

export default usePagination

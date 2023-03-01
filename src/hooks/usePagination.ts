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
    const postUserPromises = queryResult.docs.map(d => d.data().user.get())
    const rawResult = await Promise.all(postUserPromises)
    const result = rawResult.map(d => d.data())
    const paginatedResult: Array<IPost> = queryResult.docs.map(
      (doc, index) => ({
        ...(doc.data() as IPost),
        username: result[index].username,
        userProfile: result[index].profilePic,
        key: doc.id,
      }),
    )
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
    const postUserPromises = queryResult.docs.map(d => d.data().user.get())
    const rawResult = await Promise.all(postUserPromises)
    const result = rawResult.map(d => d.data())
    const paginatedResult: Array<IPost> = queryResult.docs.map(
      (doc, index) => ({
        ...(doc.data() as IPost),
        username: result[index].username,
        userProfile: result[index].profilePic,
        key: doc.id,
      }),
    )
    const lastVisibleDocRef = getLastVisibleDocRef(queryResult)

    return {paginatedResult, lastVisibleDocRef}
  }

  return {queryMore, queryMoreFilter}
}

export default usePagination

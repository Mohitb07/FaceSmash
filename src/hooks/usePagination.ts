import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'
import {useCallback} from 'react'
import {IPost} from '../interface'
import {getLastVisibleDocRef} from '../utils/getLastVisibleDocRef'

const LIMIT = 5

const usePagination = () => {
  // const retrieveMore = useCallback(
  //   async (
  //     lastVisible,
  //     collection,
  //     getterData,
  //     setter,
  //     where = false,
  //     arg1 = '',
  //     arg2 = '',
  //     arg3 = '',
  //   ) => {
  //     console.log('calling')
  //     if (!lastVisible) {
  //       return
  //     }
  //     setter(prev => ({
  //       ...prev,
  //       loading: true,
  //     }))
  //     let dataList
  //     try {
  //       if (where) {
  //         dataList = await firestore()
  //           .collection(collection)
  //           .where(arg1, arg2, arg3)
  //           .orderBy('createdAt', 'desc')
  //           .startAfter(lastVisible)
  //           .limit(LIMIT)
  //           .get()
  //       } else {
  //         dataList = await firestore()
  //           .collection(collection)
  //           .orderBy('createdAt', 'desc')
  //           .startAfter(lastVisible)
  //           .limit(LIMIT)
  //           .get()
  //       }
  //       const latestPost = dataList.docs.map(item => ({
  //         ...item.data(),
  //         key: item.id,
  //       }))
  //       let lastVisibleDoc = dataList.docs[dataList.docs.length - 1]
  //       setter(prev => ({
  //         ...prev,
  //         posts: [...getterData, ...latestPost],
  //         loading: false,
  //         lastVisible: lastVisibleDoc,
  //       }))
  //     } catch (error) {
  //       console.log('getPosts error', error)
  //       setter(prev => ({
  //         ...prev,
  //         loading: false,
  //       }))
  //     }
  //   },
  //   [],
  // )

  const withoutCondition = async (
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
      .limit(LIMIT)
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

  const withCondition = async (
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
      .limit(LIMIT)
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

  return {withoutCondition, withCondition}
}

export default usePagination

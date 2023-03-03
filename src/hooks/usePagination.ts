import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore'

import {IPost} from '@/interface'
import {getLastVisibleDocRef} from '@/utils/getLastVisibleDocRef'

type PaginationResultType = {
  paginatedResult: IPost[]
  lastVisibleDocRef: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
}

const usePagination = () => {
  const paginate = async (
    query: FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>,
    lastVisible: FirebaseFirestoreTypes.DocumentData | null,
  ): Promise<PaginationResultType> => {
    return new Promise((resolve, reject) => {
      query.onSnapshot(
        async queryResult => {
          try {
            const userData = await Promise.all([
              ...queryResult.docs.map(d => d.data().user.get()),
            ])
            const result = userData.map(d => d.data())
            const paginatedResult = queryResult.docs.map((doc, index) => ({
              ...(doc.data() as IPost),
              username: result[index].username,
              userProfile: result[index].profilePic,
              key: doc.id,
            }))
            const lastVisibleDocRef = getLastVisibleDocRef(queryResult)
            resolve({paginatedResult, lastVisibleDocRef})
          } catch (error) {
            reject(error)
          }
        },
        err => {
          const paginatedResult: IPost[] = []
          const lastVisibleDocRef = lastVisible
          console.log('error while paginating', query, err)
          reject({
            paginatedResult,
            lastVisibleDocRef,
          })
        },
      )
    })
  }

  return {paginate}
}
export default usePagination

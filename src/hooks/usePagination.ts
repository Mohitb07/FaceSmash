import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore'

import {IPost} from '@/interface'
import {getLastVisibleDocRef} from '@/utils/getLastVisibleDocRef'

const usePagination = () => {
  const paginate = async (
    query: FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>,
  ) => {
    const queryResult = await query.get()
    const userData = await Promise.all([
      ...queryResult.docs.map(d => d.data().user.get()),
    ])
    const result = userData.map(d => d.data())
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

  return {paginate}
}
export default usePagination

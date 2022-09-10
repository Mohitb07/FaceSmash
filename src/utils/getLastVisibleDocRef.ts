import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore'

export const getLastVisibleDocRef = (
  snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
) => {
  return snapshot.docs[snapshot.docs.length - 1]
}

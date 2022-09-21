import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  ReactNode,
} from 'react'
import firestore from '@react-native-firebase/firestore'
import {AuthUserContext} from './auth'
import {IUserDetail} from '../interface'
import {defaultValues} from '../components/Header/Profile'

interface IUserDataContext {
  contextUser: IUserDetail | null
  updateUserData: (
    url: string,
    navigation: any,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    userId: string,
  ) => void
}

export const UserDataContext = React.createContext<IUserDataContext>({
  contextUser: null,
  updateUserData(url, navigation, setLoading, userId) {},
})

const UserDataProvider = ({children}: {children: ReactNode}) => {
  const [contextUser, setContextUser] = useState<IUserDetail | null>(null)
  const {user} = useContext(AuthUserContext)
  console.log('auth User inside user data context 🎯', contextUser)
  useEffect(() => {
    function getData() {
      if (user) {
        firestore()
          .collection('Users')
          .doc(user?.uid)
          .onSnapshot(
            snapshot => {
              setContextUser({
                ...defaultValues,
                ...snapshot.data(),
              })
            },
            error => {
              console.log('fetching user context error', error)
            },
          )
      }
    }
    getData()
  }, [user?.uid, user?.emailVerified])

  const updateUserData = useCallback(
    async (
      url: string,
      navigation: any,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>,
      userId: string,
    ) => {
      if (userId) {
        const userRef = firestore().collection('Users').doc(userId)

        await userRef.update({
          profilePic: url,
        })
        const batch = firestore().batch()

        const updatedUser = await firestore()
          .collection('Users')
          .doc(userId)
          .get()

        console.log('updated User', updatedUser)

        const allPosts = await firestore()
          .collection('Posts')
          .where('user', '==', userId)
          .orderBy('createdAt', 'desc')
          .get()

        allPosts.docs.forEach(doc => {
          const docRef = firestore().collection('Posts').doc(doc.id)
          batch.update(docRef, {
            userProfile: updatedUser.data()?.profilePic,
          })
        })

        batch
          .commit()
          .then(() => {
            setLoading(false)
            setContextUser({
              ...defaultValues,
              ...updatedUser.data(),
            })
            navigation.navigate('Profile', {
              providedUserId: userId,
            })
          })
          .catch(err => {
            throw Error(err.message)
          })
      }
    },
    [],
  )

  const memoizedUser = React.useMemo(
    () => ({
      contextUser,
    }),
    [contextUser],
  )

  const value = {...memoizedUser, updateUserData}

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserDataProvider
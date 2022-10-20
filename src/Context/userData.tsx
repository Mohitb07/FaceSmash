import React, {ReactNode, useCallback, useEffect, useState} from 'react'

import firestore from '@react-native-firebase/firestore'

import useAuthUser from '@/hooks/useAuthUser'
import {IUserDetail} from '@/interface'
import {POSTS_COLLECTION, USERS_COLLECTION} from '@/constants'

type UserState = IUserDetail | null

interface IUserDataContext {
  contextUser: UserState
  updateUserData: (url: string, userId: string) => void
  dispatchContextUser: (value: UserState) => void
}

export const UserDataContext = React.createContext<IUserDataContext>({
  contextUser: null,
  updateUserData: (url, userId) => {},
  dispatchContextUser: value => {},
})

const UserDataProvider = ({children}: {children: ReactNode}) => {
  const [contextUser, setContextUser] = useState<UserState>(null)
  const {user} = useAuthUser()

  const dispatchContextUser = (value: UserState) => setContextUser(null)

  console.log('auth User inside user data context 🎯', contextUser)
  useEffect(() => {
    let subscriber
    if (user) {
      subscriber = firestore()
        .collection('Users')
        .doc(user?.uid)
        .onSnapshot(
          snapshot => {
            setContextUser({
              ...(snapshot.data() as IUserDetail),
            })
          },
          error => {
            console.log('fetching user context error', error)
          },
        )
    }
    return subscriber
  }, [user?.uid, user?.emailVerified])

  const updateUserData = useCallback(async (url: string, userId: string) => {
    if (userId) {
      const userRef = firestore().collection(USERS_COLLECTION).doc(userId)
      await userRef.update({
        profilePic: url,
      })
      const batch = firestore().batch()
      const allPosts = await firestore()
        .collection(POSTS_COLLECTION)
        .where('user', '==', userId)
        .orderBy('createdAt', 'desc')
        .get()
      allPosts.docs.forEach(doc => {
        const docRef = firestore().collection(POSTS_COLLECTION).doc(doc.id)
        batch.update(docRef, {
          userProfile: url,
        })
      })
      batch
        .commit()
        .then(() => {
          setContextUser(prev => ({
            ...(prev as IUserDetail),
            profilePic: url,
          }))
        })
        .catch(err => {
          console.log('error', err)
          throw new Error(err)
        })
    }
  }, [])

  const value = {
    contextUser,
    updateUserData,
    dispatchContextUser,
  }
  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserDataProvider

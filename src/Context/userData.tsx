import React, {ReactNode, useCallback, useEffect, useState} from 'react'

import firestore from '@react-native-firebase/firestore'

import useAuthUser from '@/hooks/useAuthUser'
import {IUserDetail} from '@/interface'
import {DEFAULT_USER_DETAILS} from '@/constants'

interface IUserDataContext {
  contextUser: IUserDetail | null
  updateUserData: (url: string, userId: string) => void
}

export const UserDataContext = React.createContext<IUserDataContext>({
  contextUser: null,
  updateUserData: (url, userId) => {},
})

const UserDataProvider = ({children}: {children: ReactNode}) => {
  const [contextUser, setContextUser] = useState<IUserDetail | null>(null)
  const {user} = useAuthUser()
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
                ...DEFAULT_USER_DETAILS,
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

  const updateUserData = useCallback(async (url: string, userId: string) => {
    if (userId) {
      const userRef = firestore().collection('Users').doc(userId)
      await userRef.update({
        profilePic: url,
      })
      const batch = firestore().batch()
      const allPosts = await firestore()
        .collection('Posts')
        .where('user', '==', userId)
        .orderBy('createdAt', 'desc')
        .get()
      allPosts.docs.forEach(doc => {
        const docRef = firestore().collection('Posts').doc(doc.id)
        batch.update(docRef, {
          userProfile: url,
        })
      })
      batch
        .commit()
        .then(() => {
          setContextUser(prev => ({
            ...DEFAULT_USER_DETAILS,
            ...prev,
            profilePic: url,
          }))
        })
        .catch(err => {
          console.log('error', err)
        })
    }
  }, [])

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

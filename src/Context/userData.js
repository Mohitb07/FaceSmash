import React, {useEffect, useState, useContext, useCallback} from 'react'
import firestore from '@react-native-firebase/firestore'
import {AuthUserContext} from './auth'

export const UserDataContext = React.createContext()

const UserDataProvider = props => {
  // console.log('user data context render')
  const [contextUser, setContextUser] = useState(null)
  const {authUser} = useContext(AuthUserContext)

  console.log('auth User inside user data context 🎯', contextUser)

  useEffect(() => {
    function getData() {
      if (authUser) {
        firestore()
          .collection('Users')
          .doc(authUser?.uid)
          .onSnapshot(
            snapshot => {
              setContextUser(snapshot.data())
            },
            error => {
              console.log('fetching user context error', error)
            },
          )
      }
    }
    getData()
  }, [authUser?.uid, authUser?.emailVerified])

  const updateUserData = useCallback(
    async (url, navigation, setLoading, userId) => {
      console.log('authuser insdier', userId)
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
            userProfile: updatedUser.data().profilePic,
          })
        })

        batch
          .commit()
          .then(() => {
            setLoading(false)
            setContextUser(updatedUser.data())
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

  return <UserDataContext.Provider value={value} {...props} />
}

export default UserDataProvider

import React, {useEffect, useState, useCallback} from 'react'

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'

export interface IAuthUser {
  user: FirebaseAuthTypes.User | null
  initializing: boolean
  setAuthUser: (user: any) => void
}

export const AuthUserContext = React.createContext<IAuthUser>({
  user: null,
  initializing: true,
  setAuthUser: () => {},
})

const initialState = {
  initializing: true,
  user: null,
}

type UserState = Omit<IAuthUser, 'setAuthUser'>

const AuthUserProvider = ({children}: {children: React.ReactNode}) => {
  const [authUser, setAuth] = useState<UserState>(initialState)
  console.log('authUser is a', authUser)

  const setAuthUser = useCallback((user: FirebaseAuthTypes.User) => {
    setAuth(prev => ({
      ...prev,
      user,
    }))
  }, [])

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setAuth(prev => ({
        ...prev,
        user,
      }))
      if (authUser.initializing) {
        setAuth(prev => ({
          ...prev,
          initializing: false,
        }))
      }
    })
    return subscriber
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    user: authUser.user,
    setAuthUser,
    initializing: authUser.initializing,
  }

  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  )
}

export default AuthUserProvider

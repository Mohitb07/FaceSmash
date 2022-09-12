import React, {useEffect, useState} from 'react'

import auth from '@react-native-firebase/auth'

export interface IAuthUser {
  user: any
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
  setAuthUser: () => {},
}

const AuthUserProvider = ({children}: {children: React.ReactNode}) => {
  const [authUser, setAuth] = useState<IAuthUser>(initialState)

  const setAuthUser = (user: any) => {
    setAuth(user)
  }

  const onAuthStateChanged = function onAuthStateChanged(user: any) {
    setAuth(prev => ({
      ...prev,
      user: user,
    }))
    if (authUser.initializing)
      setAuth(prev => ({
        ...prev,
        initializing: false,
      }))
  }

  let subscriber
  useEffect(() => {
    subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  console.log('authUser is', authUser)

  const value = React.useMemo(
    () => ({
      user: authUser.user,
      setAuthUser,
      initializing: authUser.initializing,
    }),
    [authUser.user, authUser.initializing],
  )

  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  )
}

export default AuthUserProvider

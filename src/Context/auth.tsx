import React, {useEffect, useState, useCallback} from 'react'

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
}

const AuthUserProvider = ({children}: {children: React.ReactNode}) => {
  const [authUser, setAuth] = useState(initialState)
  console.log('authUser is a', authUser)

  const setAuthUser = useCallback((user: any) => {
    setAuth(prev => ({
      ...prev,
      user,
    }))
  }, [])

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

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  // const value = React.useMemo(
  //   () => ({
  //     user: authUser.user,
  //     setAuthUser,
  //     initializing: authUser.initializing,
  //   }),
  //   [authUser.user, authUser.initializing],
  // )
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

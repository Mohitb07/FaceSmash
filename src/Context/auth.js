import React, {useEffect, useState} from 'react'

import auth from '@react-native-firebase/auth'

export const AuthUserContext = React.createContext()

const AuthUserProvider = props => {
  const [authUser, setAuth] = useState(null)
  const [initializing, setInitializing] = useState(true)

  const onAuthStateChanged = function onAuthStateChanged(user) {
    setAuth(user)
    if (initializing) setInitializing(false)
  }

  let subscriber
  useEffect(() => {
    subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  console.log('authUser is', authUser)

  const value = React.useMemo(
    () => ({
      authUser,
      initializing,
    }),
    [authUser, initializing],
  )
  const memoValues = {...value, setAuth}
  return <AuthUserContext.Provider value={memoValues} {...props} />
}

export default AuthUserProvider

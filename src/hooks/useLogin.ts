import React, {useState} from 'react'
import auth from '@react-native-firebase/auth'

const useLogin = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onLoginAttempt = (email: string, password: string) => {
    setLoading(true)
    setError('')
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('User logged in!', user)
      })
      .catch(err => {
        console.log('ERROR', err.message)
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {onLoginAttempt, loading, error, setError}
}

export default useLogin

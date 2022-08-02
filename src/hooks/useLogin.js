import {View, Text} from 'react-native'
import React, {useState} from 'react'
import auth from '@react-native-firebase/auth'

const useLogin = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onLoginAttempt = (email, password) => {
    setLoading(true)
    setError('')
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('User logged in!', user)
      })
      .catch(err => {
        setLoading(false)
        console.log('ERROR', err.message)
        setError(err.message)
      })
  }

  return {onLoginAttempt, loading, error, setError}
}

export default useLogin

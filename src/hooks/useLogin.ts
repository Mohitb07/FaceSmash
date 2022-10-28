import {useState} from 'react'

import auth from '@react-native-firebase/auth'
import {GoogleSignin} from '@react-native-google-signin/google-signin'

import {CLIENT_ID} from '@/../config'

const useLogin = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  GoogleSignin.configure({
    webClientId: CLIENT_ID,
  })

  const onGoogleLoginAttempt = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn()
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential)
  }

  const onLoginAttempt = (email: string, password: string) => {
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

  return {onLoginAttempt, onGoogleLoginAttempt, loading, error, setError}
}

export default useLogin

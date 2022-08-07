import React, {useState} from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import Toast from 'react-native-toast-message'

export function useRegister() {
  const [error, setError] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const onRegisterAttempt = ({email = '', password = '', username = ''}) => {
    setLoading(true)
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async user => {
        console.log('inside user', user.user.metadata)

        await auth().currentUser.sendEmailVerification()

        firestore()
          .collection('Users')
          .doc(user.user.uid)
          .set({
            email: user.user.email,
            username: username,
            uid: user.user.uid,
            followers: [],
            followings: [],
            createdAt: user.user.metadata.creationTime,
            lastSignIn: user.user.metadata.lastSignInTime,
            profilePic:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG3eLpTAMWO-mtILepXLwg68-IChyGcXJgog&usqp=CAU',
          })
          .then(() => {
            console.log('User added!')
            Toast.show({
              type: 'success',
              text1: 'Account Created',
              text2: 'Your account created successfully  👋',
            })
          })
      })
      .catch(async error => {
        await auth().currentUser.delete()
        setLoading(false)
        console.log('error', error.message)
        if (error.code === 'auth/weak-password') {
          setError(prev => ({
            ...prev,
            password: error.message,
          }))
        } else if (
          error.code === 'auth/email-already-in-use' ||
          'auth/invalid-email'
        ) {
          setError(prev => ({
            ...prev,
            email: error.message,
          }))
        } else {
          Toast.show({
            type: 'error',
            text1: 'Registration Error',
            text2: error.message,
          })
        }
      })
  }

  return {onRegisterAttempt, error, setError, loading}
}

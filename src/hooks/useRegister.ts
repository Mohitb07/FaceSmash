import React, {useState} from 'react'

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import Toast from 'react-native-toast-message'

import {DEFAULT_PROFILE_PIC, USERS_COLLECTION} from '@/constants'

export function useRegister() {
  const [error, setError] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const createUserAttempt = async (
    user: FirebaseAuthTypes.UserCredential,
    username: string,
  ) => {
    // SEND EMAIL VERIFICATION LINK
    await auth().currentUser?.sendEmailVerification()
    firestore()
      .collection(USERS_COLLECTION)
      .doc(user.user.uid)
      .set({
        email: user.user.email,
        username: username,
        qusername: username.toLowerCase(),
        uid: user.user.uid,
        followers: [],
        followings: [],
        createdAt: user.user.metadata.creationTime,
        lastSignIn: user.user.metadata.lastSignInTime,
        profilePic: DEFAULT_PROFILE_PIC,
      })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Account Created',
          text2: 'Verification link sent to the registered email address 👋',
        })
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Registration Error',
          text2: err.message,
        })
      })
  }

  const onRegisterFail = async (err: any) => {
    await auth().currentUser?.delete()
    if (err.code === 'auth/weak-password') {
      setError(prev => ({
        ...prev,
        password: err.message,
      }))
    } else if (
      err.code === 'auth/email-already-in-use' ||
      'auth/invalid-email'
    ) {
      setError(prev => ({
        ...prev,
        email: err.message,
      }))
    } else {
      Toast.show({
        type: 'err',
        text1: 'Registration Error',
        text2: err.message,
      })
    }
  }

  const onRegisterAttempt = (
    email: string = '',
    password: string = '',
    username: string = '',
  ) => {
    const sanitizedEmail = email.trim()
    const sanitizedPassword = password.trim()
    const sanitizedUsername = username.trim()
    if (sanitizedEmail && sanitizedPassword && sanitizedUsername) {
      setLoading(true)
      auth()
        .createUserWithEmailAndPassword(sanitizedEmail, sanitizedPassword)
        .then(user => createUserAttempt(user, username))
        .catch(onRegisterFail)
        .finally(() => setLoading(false))
    }
  }

  return {onRegisterAttempt, error, setError, loading}
}

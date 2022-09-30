import React from 'react'
import {TouchableOpacity} from 'react-native'

import firestore from '@react-native-firebase/firestore'

import {GoogleIcon} from '../../../SVG'
import useLogin from '../../../hooks/useLogin'

const GoogleLogin: React.FC = () => {
  const {onGoogleLoginAttempt} = useLogin()

  const createGoogleUser = () => {
    onGoogleLoginAttempt()
      .then(user => {
        firestore()
          .collection('Users')
          .doc(user.user.uid)
          .set({
            email: user.user.email,
            username: user.user.displayName,
            qusername: user.user.displayName?.toLowerCase(),
            uid: user.user.uid,
            followers: [],
            followings: [],
            createdAt: user.user.metadata.creationTime,
            lastSignIn: user.user.metadata.lastSignInTime,
            profilePic: user.user.photoURL,
          })
          .then(() => console.log('firestore user created'))
          .catch(err => {
            console.log('firestore user created error: ', err)
          })
      })
      .catch(err => {
        console.log('error google signin', err)
      })
  }

  return (
    <TouchableOpacity onPress={createGoogleUser}>
      <GoogleIcon />
    </TouchableOpacity>
  )
}
export default GoogleLogin

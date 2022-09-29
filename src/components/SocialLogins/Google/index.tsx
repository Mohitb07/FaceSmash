import React from 'react'
import {TouchableOpacity} from 'react-native'

import {GoogleSignin} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

import {GoogleIcon} from '../../../SVG'
import {CLIENT_ID} from '../../../../config'

const GoogleLogin: React.FC = () => {
  GoogleSignin.configure({
    webClientId: CLIENT_ID,
  })

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn()

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential)
  }

  return (
    <TouchableOpacity
      onPress={() =>
        onGoogleButtonPress().then(user => console.log('user', user))
      }>
      <GoogleIcon />
    </TouchableOpacity>
  )
}
export default GoogleLogin

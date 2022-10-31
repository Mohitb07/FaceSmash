/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react'
import {Alert} from 'react-native'

import {NavigationContainer} from '@react-navigation/native'
import {NativeBaseProvider} from 'native-base'
import 'react-native-gesture-handler'
import SplashScreen from 'react-native-splash-screen'
import {RecoilRoot} from 'recoil'
import Toast from 'react-native-toast-message'

import AuthUserContext from './src/Context/auth'
import UserDataContext from './src/Context/userData'
import Navigation, {navigationRef} from './src/Navigation/Root'
import {theme} from './src/theme'
import messaging from '@react-native-firebase/messaging'

const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission()

    console.log('Authorization status:', authStatus)

    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    )
  }

  useEffect(() => {
    //@ts-ignore
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(fcmToken => {
          console.log('FCM TOKEN', fcmToken)
        })
    } else {
      console.log('Not authorized')
    }
    // messaging()
    //   .getInitialNotification()
    //   .then(async remoteMessage => {
    //     if (remoteMessage) {
    //       console.log('get Initial Notification')
    //     }
    //     console.log('remote res', remoteMessage)
    //     Alert.alert('Initial')
    //   })

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <>
      <RecoilRoot>
        <NativeBaseProvider theme={theme}>
          <AuthUserContext>
            <UserDataContext>
              <NavigationContainer ref={navigationRef}>
                <Navigation />
              </NavigationContainer>
            </UserDataContext>
          </AuthUserContext>
        </NativeBaseProvider>
      </RecoilRoot>
      <Toast />
    </>
  )
}

export default App

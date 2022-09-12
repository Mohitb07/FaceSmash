/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react'

import {NavigationContainer} from '@react-navigation/native'
import {NativeBaseProvider} from 'native-base'
import 'react-native-gesture-handler'
import SplashScreen from 'react-native-splash-screen'
import {RecoilRoot} from 'recoil'
const Toast = React.lazy(() => import('react-native-toast-message'))

import AuthUserContext from './src/Context/auth'
import UserDataContext from './src/Context/userData'
import Navigation, {navigationRef} from './src/Navigation/Root'
import {theme} from './src/theme'

const App = () => {
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

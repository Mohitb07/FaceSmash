/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

import {NativeBaseProvider} from 'native-base';
import {RecoilRoot} from 'recoil';
import Toast from 'react-native-toast-message';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import Navigation, {navigationRef} from './src/Navigation/Root';
import UserDataContext from './src/Context/userData';
import BottomSheetProvider from './src/Context/BottomSheet';
import {theme} from './src/theme';
import AuthUserContext from './src/Context/auth';
import BottomSheet from './src/components/BottomSheet';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <RecoilRoot>
        <NativeBaseProvider theme={theme}>
          <AuthUserContext>
            <UserDataContext>
              <BottomSheetProvider>
                <NavigationContainer ref={navigationRef}>
                  <Navigation />
                </NavigationContainer>
                <BottomSheet />
              </BottomSheetProvider>
            </UserDataContext>
          </AuthUserContext>
        </NativeBaseProvider>
      </RecoilRoot>
      <Toast />
    </>
  );
};

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, Suspense} from 'react';
import {ActivityIndicator} from 'react-native';

import {NativeBaseProvider} from 'native-base';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
const Toast = React.lazy(() => import('react-native-toast-message'));
import 'react-native-gesture-handler';

import Navigation, {navigationRef} from './src/Navigation/Root';
import UserDataContext from './src/Context/userData';
import BottomSheetProvider from './src/Context/BottomSheet';
import {theme} from './src/theme';
import AuthUserContext from './src/Context/auth';
import Loader from './src/components/Loader';
const BottomSheet = React.lazy(() => import('./src/components/BottomSheet'));

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  );
};

export default App;

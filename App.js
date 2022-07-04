/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation, {navigationRef} from './src/Navigation/Root';
import UserDataContext from './src/Context/userData';
import BottomSheetProvider from './src/Context/BottomSheet';
import {NativeBaseProvider} from 'native-base';
import {theme} from './src/theme';
import {RecoilRoot} from 'recoil';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <RecoilRoot>
      <NativeBaseProvider theme={theme}>
        {/* <AuthContext> */}
        <UserDataContext>
          <BottomSheetProvider>
            <NavigationContainer ref={navigationRef}>
              <Navigation />
            </NavigationContainer>
          </BottomSheetProvider>
        </UserDataContext>
        {/* </AuthContext> */}
      </NativeBaseProvider>
    </RecoilRoot>
  );
};

export default App;

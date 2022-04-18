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
import Context from './src/Context/auth';
import {NativeBaseProvider} from 'native-base';
import {theme} from './src/theme';

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Context>
        <NavigationContainer ref={navigationRef}>
          <Navigation />
        </NavigationContainer>
      </Context>
    </NativeBaseProvider>
  );
};

export default App;

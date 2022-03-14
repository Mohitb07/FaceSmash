import {View, Text} from 'react-native';
import React, {createRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../Screens/Home';

const RootStack = createNativeStackNavigator();
export const navigationRef = createRef();

const Root = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default Root;

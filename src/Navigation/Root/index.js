import {View, Text} from 'react-native';
import React, {createRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../Screens/Home';
import Login from '../../Screens/Login';
import GetStarted from '../../Screens/GetStarted';
import MyProfile from '../../Screens/Profile';

const RootStack = createNativeStackNavigator();
export const navigationRef = createRef();

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    <RootStack.Navigator>
      {isLoggedIn ? (
        <>
          <RootStack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <RootStack.Screen
            name="Get Started"
            component={GetStarted}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Profile"
            component={MyProfile}
            options={{headerShown: false}}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default Root;

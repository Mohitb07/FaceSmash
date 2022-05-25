import {TouchableOpacity} from 'react-native';
import React, {createRef, useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../Screens/Home';
import Login from '../../Screens/Login';
import GetStarted from '../../Screens/GetStarted';
import MyProfile from '../../Screens/Profile';

import {GearIcon} from '../../SVG';
import {BottomSheetContext} from '../../Context/BottomSheet';
import {AuthContext} from '../../Context/auth';
import Register from '../../Screens/Register';

const RootStack = createNativeStackNavigator();
export const navigationRef = createRef();

const Root = () => {
  const {authUser} = useContext(AuthContext);
  const {onOpen} = useContext(BottomSheetContext);

  return (
    <RootStack.Navigator>
      {!!authUser ? (
        <>
          <RootStack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Profile"
            component={MyProfile}
            options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackTitleVisible: false,
              headerTintColor: '#fff',
              headerRight: () => (
                <TouchableOpacity onPress={onOpen}>
                  <GearIcon />
                </TouchableOpacity>
              ),
            }}
          />
        </>
      ) : (
        <>
          {/* <RootStack.Screen
            name="Root"
            component={BottomTab}
            options={{headerShown: false}}
          /> */}
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
            name="Sign Up"
            component={Register}
            options={{headerShown: false}}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default Root;

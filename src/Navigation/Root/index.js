import React, {createRef, useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../../Screens/Home';
import Login from '../../Screens/Login';
import GetStarted from '../../Screens/GetStarted';
import MyProfile from '../../Screens/Profile';

import {GearIcon, CheckIcon} from '../../SVG';
import {BottomSheetContext} from '../../Context/BottomSheet';
import {AuthContext} from '../../Context/auth';
import Register from '../../Screens/Register';
import UpdateProfile from '../../Screens/Profile/Update';
import RightHeader from '../../components/RightHeader';
import Loader from '../../components/Loader';
// import BottomTab from '../BottomNavigation';

const RootStack = createNativeStackNavigator();
export const navigationRef = createRef();

const Root = () => {
  const {authUser, initializing} = useContext(AuthContext);
  const {onOpen} = useContext(BottomSheetContext);

  if (initializing) {
    return <Loader />;
  }

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
                <RightHeader onOpen={onOpen} icon={<GearIcon />} />
              ),
            }}
          />
          <RootStack.Screen
            name="Update Profile"
            component={UpdateProfile}
            options={{
              headerShown: false,
              headerTransparent: true,
              headerTitle: 'Update Profile',
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerRight: () => <RightHeader icon={<CheckIcon />} />,
            }}
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

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {createRef, useContext} from 'react';

import GetStarted from '../../Screens/GetStarted';
import Home from '../../Screens/Home';
import Login from '../../Screens/Login';
import MyProfile from '../../Screens/Profile';

import Loader from '../../components/Loader';
import {AuthUserContext} from '../../Context/auth';
import AddPost from '../../Screens/AddPost';
import Browser from '../../Screens/Browser';
import UpdateProfile from '../../Screens/Profile/Update';
import Register from '../../Screens/Register';

const RootStack = createNativeStackNavigator();
export const navigationRef = createRef();

const Root = () => {
  const {authUser, initializing} = useContext(AuthUserContext);

  if (initializing) {
    return <Loader />;
  }

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {!!authUser ? (
        <>
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="Profile" component={MyProfile} />
          <RootStack.Screen name="Update Profile" component={UpdateProfile} />
          <RootStack.Screen name="Add Post" component={AddPost} />
          <RootStack.Screen name="Browser" component={Browser} />
        </>
      ) : (
        <>
          <RootStack.Screen name="Get Started" component={GetStarted} />
          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="Sign Up" component={Register} />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default Root;

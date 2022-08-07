import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React, {createRef, useContext} from 'react'

import auth from '@react-native-firebase/auth'

import Loader from '../../components/Loader'
import {AuthUserContext} from '../../Context/auth'
import AddPost from '../../Screens/AddPost'
import Browser from '../../Screens/Browser'
import GetStarted from '../../Screens/GetStarted'
import Home from '../../Screens/Home'
import Login from '../../Screens/Login'
import MyProfile from '../../Screens/Profile'
import UpdateProfile from '../../Screens/Profile/Update'
import Register from '../../Screens/Register'
import Verification from '../../Screens/Verification'

const RootStack = createNativeStackNavigator()
export const navigationRef = createRef()

const Root = () => {
  const {authUser, initializing} = useContext(AuthUserContext)

  if (initializing) {
    return <Loader />
  }

  return (
    <RootStack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      {!!authUser ? (
        <>
          {!authUser?.emailVerified ? (
            <RootStack.Screen name="Verification" component={Verification} />
          ) : (
            <>
              <RootStack.Screen name="Home" component={Home} />
              <RootStack.Screen name="Profile" component={MyProfile} />
              <RootStack.Screen
                name="Update Profile"
                component={UpdateProfile}
                options={{
                  animation: 'slide_from_bottom',
                }}
              />
              <RootStack.Screen
                name="Add Post"
                component={AddPost}
                options={{
                  animation: 'slide_from_bottom',
                }}
              />
              <RootStack.Screen
                name="Browser"
                component={Browser}
                options={{
                  animation: 'slide_from_bottom',
                }}
              />
            </>
          )}
        </>
      ) : (
        <>
          <RootStack.Screen name="Get Started" component={GetStarted} />
          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="Sign Up" component={Register} />
        </>
      )}
    </RootStack.Navigator>
  )
}

export default Root

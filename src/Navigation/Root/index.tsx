import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React, {createRef, useContext} from 'react'

import Loader from '../../components/Loader'
import {COLORS} from '../../constants'
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

export type RootStackParamList = {
  Verification: undefined
  GetStarted: undefined
  Login: undefined
  SignUp: undefined
  Home: undefined
  Profile: {
    providedUserId: string
  }
  UpdateProfile: undefined
  AddPost: undefined
  Browser: {
    uri: string
  }
}

const RootStack = createNativeStackNavigator<RootStackParamList>()
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
              <RootStack.Screen
                name="Profile"
                component={MyProfile}
                options={{
                  headerShown: true,
                  title: 'Profile',
                  headerTitleAlign: 'center',
                  headerTintColor: '#fff',
                  headerStyle: {
                    backgroundColor: COLORS.mainBackground,
                  },
                }}
              />
              <RootStack.Screen
                name="UpdateProfile"
                component={UpdateProfile}
                options={{
                  animation: 'slide_from_bottom',
                }}
              />
              <RootStack.Screen
                name="AddPost"
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
          <RootStack.Screen name="GetStarted" component={GetStarted} />
          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="SignUp" component={Register} />
        </>
      )}
    </RootStack.Navigator>
  )
}

export default Root

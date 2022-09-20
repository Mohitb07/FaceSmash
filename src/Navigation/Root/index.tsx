import {NavigationContainerRef} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React, {createRef, Ref, useContext} from 'react'

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
import SearchUser from '../../Screens/Search'
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
  AddPost: {
    selectedImageURI?: string
    selectedImageRef?: string
  }
  Browser: {
    uri: string
  }
  SearchUser: undefined
}

const RootStack = createNativeStackNavigator<RootStackParamList>()
export const navigationRef: Ref<NavigationContainerRef<RootStackParamList>> =
  createRef()

const Root = () => {
  const {user, initializing} = useContext(AuthUserContext)

  if (initializing) {
    return <Loader />
  }

  return (
    <RootStack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      {!!user ? (
        <>
          {!user?.emailVerified ? (
            <RootStack.Screen name="Verification" component={Verification} />
          ) : (
            <>
              <RootStack.Screen name="Home" component={Home} />
              <RootStack.Screen
                name="Profile"
                component={MyProfile}
                options={{
                  headerShown: true,
                  title: '',
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
                name="SearchUser"
                component={SearchUser}
                options={{
                  headerShown: false,
                  headerTintColor: '#fff',
                  headerStyle: {
                    backgroundColor: COLORS.mainBackground,
                  },
                  animation: 'fade_from_bottom',
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

import React, {createRef, Ref} from 'react'

import {NavigationContainerRef} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import AddPost from '@/Screens/AddPost'
import Browser from '@/Screens/Browser'
import GetStarted from '@/Screens/GetStarted'
import Home from '@/Screens/Home'
import Login from '@/Screens/Login'
import MyProfile from '@/Screens/Profile'
import Register from '@/Screens/Register'
import SearchUser from '@/Screens/Search'
import Verification from '@/Screens/Verification'
import UpdateProfile from '@/Screens/Profile/Update'
import Loader from '@/components/Loader'
import {COLORS} from '@/constants'
import useAuthUser from '@/hooks/useAuthUser'

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
  AddPost?: {
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
  const {user, initializing} = useAuthUser()

  if (initializing) {
    return <Loader />
  }

  return (
    <RootStack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      {user ? (
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
                  headerTintColor: COLORS.white,
                  headerStyle: {
                    backgroundColor: COLORS.black,
                  },
                }}
              />
              <RootStack.Screen
                name="UpdateProfile"
                component={UpdateProfile}
                options={{
                  animation: 'slide_from_bottom',
                  headerShown: true,
                  title: 'Update Profile',
                  headerTitleAlign: 'center',
                  headerTintColor: COLORS.white,
                  headerStyle: {
                    backgroundColor: COLORS.mainBackground,
                  },
                }}
              />
              <RootStack.Screen
                name="AddPost"
                component={AddPost}
                options={{
                  animation: 'slide_from_bottom',
                  headerShown: true,
                  title: 'Add Post',
                  headerTitleAlign: 'center',
                  headerTintColor: COLORS.white,
                  headerStyle: {
                    backgroundColor: COLORS.mainBackground,
                  },
                }}
              />
              <RootStack.Screen
                name="SearchUser"
                component={SearchUser}
                options={{
                  headerShown: false,
                  headerTintColor: COLORS.white,
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

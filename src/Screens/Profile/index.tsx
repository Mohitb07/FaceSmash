import React from 'react'

import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '@/Navigation/Root'

import ProfileContent from './Body'
import BottomSheetProvider from '@/Context/BottomSheet'
import Screen from '@/components/Screen'

type ProfileScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>

const MyProfile = ({route}: ProfileScreenNavigationProp) => {
  const {providedUserId} = route.params || null

  return (
    <BottomSheetProvider>
      <Screen>
        <ProfileContent userId={providedUserId} />
      </Screen>
    </BottomSheetProvider>
  )
}

export default MyProfile

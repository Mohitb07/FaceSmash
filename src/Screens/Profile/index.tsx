import React from 'react'

import {View} from 'native-base'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '@/Navigation/Root'

import ProfileFeed from './Body'
import {COLORS} from '@/constants'
import BottomSheetProvider from '@/Context/BottomSheet'

type ProfileScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>

const MyProfile = ({route}: ProfileScreenNavigationProp) => {
  const {providedUserId} = route?.params || null

  return (
    <BottomSheetProvider>
      <View flex={1} backgroundColor={COLORS.black}>
        <ProfileFeed userId={providedUserId} />
      </View>
    </BottomSheetProvider>
  )
}

export default MyProfile

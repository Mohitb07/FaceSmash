import React from 'react'
import {StyleSheet, View} from 'react-native'

import {RouteProp} from '@react-navigation/native'

import ProfileFeed from './Body'
import {COLORS} from '@/constants'
import BottomSheetProvider from '@/Context/BottomSheet'

const MyProfile = ({
  route,
}: {
  route: RouteProp<{params: {providedUserId: string}}, 'params'>
}) => {
  const {providedUserId} = route?.params || null

  return (
    <BottomSheetProvider>
      <View style={styles.container}>
        <ProfileFeed userId={providedUserId} />
      </View>
    </BottomSheetProvider>
  )
}

export default MyProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
  },
})

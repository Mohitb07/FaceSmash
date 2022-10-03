import React, {useLayoutEffect} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'

import {RouteProp, useNavigation} from '@react-navigation/native'
import {useSetRecoilState} from 'recoil'

import {bottomSheetState} from '@/atoms/bottomSheetAtom'
import ProfileFeed from '@/components/FlatList/ProfileFeed'
import {COLORS} from '@/constants'
import BottomSheetProvider from '@/Context/BottomSheet'
import {ThreeDotsIcon} from '@/SVG'
import {IBottomSheetState} from '@/interface'

const MyProfile = ({
  route,
}: {
  route: RouteProp<{params: {providedUserId: string}}, 'params'>
}) => {
  const navigation = useNavigation()
  const {providedUserId} = route?.params || null
  const setBottomSheetStateValue =
    useSetRecoilState<IBottomSheetState>(bottomSheetState)

  const handleModalState = () =>
    setBottomSheetStateValue(() => ({
      type: 'profile',
      isOpen: true,
    }))

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleModalState}
          style={styles.threeDotsIconContainer}>
          <ThreeDotsIcon fill={COLORS.white} />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

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
  threeDotsIconContainer: {
    transform: [{rotate: '90deg'}],
  },
})

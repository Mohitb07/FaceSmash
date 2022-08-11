import React, {useLayoutEffect} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

import {RouteProp, useNavigation} from '@react-navigation/native'
import {useSetRecoilState} from 'recoil'

import {bottomSheetState, IBottomSheetState} from '../../atoms/bottomSheetAtom'
import ProfileFeed from '../../components/FlatList/ProfileFeed'
import {COLORS} from '../../constants'
import BottomSheetProvider from '../../Context/BottomSheet'
import {GearIcon} from '../../SVG'

const MyProfile = ({
  route,
}: {
  route: RouteProp<{params: {providedUserId: string}}, 'params'>
}) => {
  const navigation = useNavigation()
  const {providedUserId} = route?.params || null
  const setBottomSheetStateValue =
    useSetRecoilState<IBottomSheetState>(bottomSheetState)

  const handleModalState = () => {
    setBottomSheetStateValue(prev => ({
      ...prev,
      type: 'profile',
      isOpen: true,
    }))
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleModalState}>
          <GearIcon />
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
    // paddingHorizontal: 15,
  },
})

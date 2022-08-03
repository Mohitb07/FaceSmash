import React, {useEffect, useRef} from 'react'
import {StyleSheet, View} from 'react-native'

import {useSetRecoilState} from 'recoil'

import {bottomSheetState} from '../../atoms/bottomSheetAtom'
import ProfileFeed from '../../components/FlatList/ProfileFeed'
import Header from '../../components/Header'
import {COLORS} from '../../constants'
import BottomSheetProvider from '../../Context/BottomSheet'
import {GearIcon} from '../../SVG'

const MyProfile = ({route, navigation}) => {
  const {providedUserId} = route?.params || null
  const setBottomSheetStateValue = useSetRecoilState(bottomSheetState)
  const counter = useRef(0)

  useEffect(() => {
    counter.current = counter.current + 1
  })

  console.log('profile index counter', counter.current)

  const handleModalState = () => {
    setBottomSheetStateValue(prev => ({
      ...prev,
      type: 'profile',
      isOpen: true,
    }))
  }

  return (
    <BottomSheetProvider>
      <Header
        showBackButton={true}
        navigation={navigation}
        key="profile"
        label="Profile"
        rightSection
        rightIcon={<GearIcon />}
        onPress={handleModalState}
      />
      <View style={styles.container}>
        <ProfileFeed userId={providedUserId} navigation={navigation} />
      </View>
    </BottomSheetProvider>
  )
}

export default MyProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
    paddingHorizontal: 15,
  },
})

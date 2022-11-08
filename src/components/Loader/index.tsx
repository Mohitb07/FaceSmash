import React from 'react'
import {ActivityIndicator, StyleSheet} from 'react-native'

import {View} from 'native-base'

import {COLORS} from '@/constants'

const Loader = () => {
  return (
    <View
      flex={1}
      backgroundColor={COLORS.black}
      justifyContent="center"
      alignItems="center"
      style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
})

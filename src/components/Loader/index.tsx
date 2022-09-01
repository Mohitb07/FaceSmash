import {View, ActivityIndicator, StyleSheet} from 'react-native'
import React from 'react'
import {COLORS} from '../../constants'

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

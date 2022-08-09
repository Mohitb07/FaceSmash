import React from 'react'
import {StyleSheet, View} from 'react-native'

import type {NativeStackScreenProps} from '@react-navigation/native-stack'

import HomeFeed from '../../components/FlatList/HomeFeed'
import {COLORS} from '../../constants'
import {RootStackParamList} from '../../Navigation/Root'

type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>

const Home = ({navigation}: HomeScreenNavigationProp) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <HomeFeed />
      </View>
    </View>
  )
}
export default React.memo(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
    paddingHorizontal: 10,
  },
  innerContainer: {
    flex: 1,
    paddingVertical: 10,
  },
})

import React from 'react'
import {StyleSheet, View} from 'react-native'

import HomeFeedContainer from '../../components/FlatList/HomeFeed'
import {COLORS} from '../../constants'

const Home = () => {
  return (
    <View style={styles.container}>
      <HomeFeedContainer />
    </View>
  )
}
export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
  },
})

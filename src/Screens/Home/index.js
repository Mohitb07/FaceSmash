import React from 'react';
import {StyleSheet, View} from 'react-native';

import HomeFeed from '../../components/FlatList/HomeFeed';
import {COLORS} from '../../constants';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <HomeFeed navigation={navigation} />
      </View>
    </View>
  );
};
export default React.memo(Home);

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
});

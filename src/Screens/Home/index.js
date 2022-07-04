import React from 'react';
import {StyleSheet, View} from 'react-native';

import CustomFlatList from '../../components/FlatList';

const Home = ({navigation}) => {
  console.log('home rendered');

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <CustomFlatList navigation={navigation} />
      </View>
    </View>
  );
};
export default React.memo(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    paddingHorizontal: 20,
  },
  innerContainer: {
    flex: 1,
    paddingVertical: 10,
  },
});

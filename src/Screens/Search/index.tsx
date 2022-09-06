import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useState} from 'react'
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {COLORS} from '../../constants'
import {RootStackParamList} from '../../Navigation/Root'

import {FlatList} from 'native-base'
import AutoCompleteInput from '../../components/AutoCompleteInput'
import {dummyStoryData} from '../../components/Header/Home'
import Story from '../../components/Story'
import {BackIcon, TrendingIcon} from '../../SVG'

type SearchUserScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'SearchUser'
>

const SearchUser: React.FC<SearchUserScreenNavigationProp> = ({navigation}) => {
  const [marginAnimation] = useState(new Animated.Value(0))

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <AutoCompleteInput marginAnimation={marginAnimation} />
      </View>

      <Animated.View
        style={[
          styles.recommendedUser,
          {
            translateY: marginAnimation,
          },
        ]}>
        <View style={styles.recommendedTextContainer}>
          <TrendingIcon fill="#fff" />
          <Text style={styles.recommendedUserText}>Recommended User</Text>
        </View>
        <FlatList
          horizontal
          data={dummyStoryData}
          renderItem={({item}) => (
            <Story
              key={item.id}
              uri={item.uri}
              username={item.username}
              textStyle={{width: 40}}
            />
          )}
        />
      </Animated.View>
    </View>
  )
}
export default SearchUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
  },
  headerContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  recommendedUser: {
    paddingHorizontal: 5,
  },
  recommendedTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  recommendedUserText: {
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 10,
    fontFamily: 'Lato-Bold',
    marginLeft: 10,
  },
})

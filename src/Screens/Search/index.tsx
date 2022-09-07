import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useRef, useState} from 'react'
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {COLORS} from '../../constants'
import {RootStackParamList} from '../../Navigation/Root'

import {
  Avatar,
  Button,
  FlatList,
  HStack,
  Text as NText,
  View as NView,
} from 'native-base'
import AutoCompleteInput from '../../components/AutoCompleteInput'
import {dummyStoryData} from '../../components/Header/Home'
import Story from '../../components/Story'
import {BackIcon, SearchIcon1, TrendingIcon, UserGroup} from '../../SVG'
import {IUserDetail} from '../../types'

type SearchUserScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'SearchUser'
>

const SearchUser: React.FC<SearchUserScreenNavigationProp> = ({navigation}) => {
  const [marginAnimation] = useState(new Animated.Value(0))
  const [foundUsers, setFoundUsers] = useState<Array<IUserDetail> | null>(null)
  const currentInputValue = useRef('')

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <AutoCompleteInput
          marginAnimation={marginAnimation}
          setFoundUsers={setFoundUsers}
          currentInputValue={currentInputValue}
        />
      </View>

      <Animated.View
        style={[
          styles.recommendedUser,
          {
            translateY: marginAnimation,
          },
        ]}>
        <View style={styles.recommendedTextContainer}>
          <UserGroup />
          <Text style={styles.recommendedUserText}>Recommended User</Text>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dummyStoryData}
          renderItem={({item}) => (
            <View style={styles.storyContainer}>
              <Story
                key={item.id}
                uri={item.uri}
                username={item.username}
                textStyle={{maxWidth: 50}}
                size="lg"
                containerStyle={styles.storyContainerStyle}
              />
              <Button
                _text={{
                  color: '#fff',
                  fontSize: 12,
                }}
                borderWidth="1"
                size="md"
                mt="2"
                borderRadius="full"
                variant="solid">
                Follow
              </Button>
            </View>
          )}
        />
      </Animated.View>

      {foundUsers && (
        <Animated.View
          style={[
            styles.foundUserContainer,
            {
              translateY: marginAnimation,
            },
          ]}>
          <NView alignItems="center" flexDirection="row">
            <SearchIcon1 height="16px" width="16px" />
            <Text style={styles.recommendedUserText}>
              Result for {currentInputValue.current}
            </Text>
          </NView>

          <FlatList
            data={foundUsers}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Profile', {
                    providedUserId: item.uid,
                  })
                }>
                <HStack
                  marginY="3"
                  alignItems="center"
                  justifyContent="space-between">
                  <NView flexDirection="row" alignItems="center">
                    <Avatar
                      size="lg"
                      borderColor={COLORS.primary}
                      mr="3"
                      padding="0.5"
                      bgColor={COLORS.mainBackground}
                      source={{
                        uri: item.profilePic,
                      }}
                    />
                    <View>
                      <NText color="white" fontWeight={600}>
                        {item.username}
                      </NText>
                      <NText color="gray.500" fontWeight={600}>
                        {item.email}
                      </NText>
                    </View>
                  </NView>
                  <Button
                    onPress={() => console.log('follow', item.uid)}
                    size="md"
                    borderRadius="full"
                    variant="outline"
                    fontFamily="Lato-Heavy">
                    Follow
                  </Button>
                </HStack>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      )}
    </View>
  )
}
export default SearchUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
    paddingHorizontal: 10,
  },
  headerContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
  },
  recommendedUser: {
    // paddingHorizontal: 5,
  },
  recommendedTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  recommendedUserText: {
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 10,
    fontFamily: 'Lato-Bold',
    marginLeft: 10,
    marginVertical: 10,
  },
  storyContainerStyle: {
    width: 80,
  },
  storyContainer: {
    flexDirection: 'column',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foundUserContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
})

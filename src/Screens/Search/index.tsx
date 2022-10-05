import React, {useRef, useState, FC} from 'react'
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {
  Avatar,
  Button,
  FlatList,
  HStack,
  Text as NText,
  View as NView,
} from 'native-base'

import AutoCompleteInput from '@/components/AutoCompleteInput'
import {DUMMY_STORY_DATA} from '@/constants'
import Story from '@/components/Story'
import {BackIcon, SearchIcon1, UserGroup} from '@/SVG'
import {IUserDetail} from '@/interface'
import {COLORS, FONTS} from '@/constants'
import {RootStackParamList} from '@/Navigation/Root'

type SearchUserScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'SearchUser'
>

const SearchUser: FC<SearchUserScreenNavigationProp> = ({navigation}) => {
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
        <View style={styles.headingContainer}>
          <UserGroup />
          <Text style={styles.recommendedUserText}>Recommended User</Text>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={DUMMY_STORY_DATA}
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
          <NView style={styles.headingContainer}>
            <SearchIcon1 height="16px" width="16px" />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.recommendedUserText}>
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
                  <NView flexDirection="row" alignItems="center" flex={1}>
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
                    <NView flex={1}>
                      <NText
                        color="white"
                        fontWeight={600}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {item.username}
                      </NText>
                      <NText
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        color="gray.500"
                        fontWeight={600}>
                        {item.email}
                      </NText>
                    </NView>
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
  },
  recommendedUser: {
    padding: 1,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  recommendedUserText: {
    flex: 1,
    color: COLORS.white,
    marginBottom: 10,
    marginLeft: 10,
    marginVertical: 10,
    ...FONTS.h3,
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
    marginVertical: 8,
    padding: 1,
  },
})

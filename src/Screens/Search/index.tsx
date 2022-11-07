import React, {useRef, useState, FC} from 'react'
import {Animated, StyleSheet, TouchableOpacity} from 'react-native'

import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {Avatar, Button, FlatList, HStack, Text, View} from 'native-base'

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

const SearchUser: FC<SearchUserScreenNavigationProp> = ({
  navigation: {navigate, goBack},
}) => {
  const [marginAnimation] = useState(new Animated.Value(0))
  const [foundUsers, setFoundUsers] = useState<Array<IUserDetail> | null>(null)
  const currentInputValue = useRef('')

  return (
    <View flex={1} backgroundColor={COLORS.black} paddingX={3}>
      <View position="relative" flexDirection="row" alignItems="center">
        <TouchableOpacity onPress={goBack}>
          <BackIcon />
        </TouchableOpacity>
        <AutoCompleteInput
          marginAnimation={marginAnimation}
          setFoundUsers={setFoundUsers}
          currentInputValue={currentInputValue}
        />
      </View>
      <Animated.View style={[{translateY: marginAnimation}]}>
        <View padding={1}>
          <View flexDirection="row" alignItems="center" mb={1}>
            <UserGroup />
            <Text style={styles.recommendedUserText}>Recommended User</Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={DUMMY_STORY_DATA}
            renderItem={({item}) => (
              <View marginRight={3} justifyContent="center" alignItems="center">
                <Story
                  key={item.id}
                  uri={item.uri}
                  username={item.username}
                  textStyle={styles.storyTextStyle}
                  size="lg"
                  containerStyle={styles.storyContainerStyle}
                />
                <Button
                  _text={styles.btnText}
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
        </View>

        {foundUsers && (
          <View my={3} padding={1}>
            <View flexDirection="row" alignItems="center" mb={1}>
              <SearchIcon1 height="16px" width="16px" />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.recommendedUserText}>
                Result for {currentInputValue.current}
              </Text>
            </View>

            <FlatList
              data={foundUsers}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigate('Profile', {
                      providedUserId: item.uid,
                    })
                  }>
                  <HStack
                    marginY="3"
                    alignItems="center"
                    justifyContent="space-between">
                    <View flexDirection="row" alignItems="center" flex={1}>
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
                      <View flex={1}>
                        <Text
                          color="white"
                          fontWeight={600}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {item.username}
                        </Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          color="gray.500"
                          fontWeight={600}>
                          {item.email}
                        </Text>
                      </View>
                    </View>
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
          </View>
        )}
      </Animated.View>
    </View>
  )
}
export default SearchUser

const styles = StyleSheet.create({
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
  btnText: {
    color: COLORS.white,
    ...FONTS.body5,
  },
  storyTextStyle: {
    maxWidth: 50,
  },
})

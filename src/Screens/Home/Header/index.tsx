import React from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'

import {Avatar, HStack, Input, ScrollView, Text, View} from 'native-base'
import auth from '@react-native-firebase/auth'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import InstaStory from 'react-native-insta-story'

import {COLORS, FONTS, STORY_DATA} from '@/constants'
import useSelectImage from '@/hooks/useSelectImage'
import useUserData from '@/hooks/useUserData'
import {RootStackParamList} from '@/Navigation/Root'
import {PhotoIcon, SearchIcon} from '@/SVG'
import Story from '@/components/Story'
import Brand from '@/components/BrandText'

function HomeHeader() {
  const {contextUser} = useUserData()
  const {handleChooseGallary} = useSelectImage()
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const handleGetImageThenNavigate = () => handleChooseGallary(true, 'AddPost') // true to navigate

  const user = auth().currentUser?.uid

  return (
    <View mb="5" paddingX="2">
      <View
        height="12"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Brand size="2xl" />
        <TouchableOpacity
          onPress={() => navigate('SearchUser')}
          style={styles.rightHeader}
          hitSlop={styles.searchIcon}>
          <SearchIcon />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        accessibilityLabel="Stories"
        borderBottomColor={COLORS.transparentGray}
        borderBottomWidth="1"
        pb="3"
        my="5">
        <HStack space="3" alignItems="center">
          <Story noRing uri={contextUser?.profilePic} />
          <InstaStory
            unPressedBorderColor={COLORS.primary}
            data={STORY_DATA}
            duration={10}
            avatarTextStyle={styles.storyTextStyle}
            customSwipeUpComponent={
              <View>
                <Text>Swipe</Text>
              </View>
            }
          />
        </HStack>
      </ScrollView>
      <View
        justifyContent="space-around"
        flexDirection="row"
        alignItems="center">
        <TouchableOpacity
          onPress={() =>
            navigate('Profile', {
              providedUserId: user ?? '',
            })
          }>
          <Avatar
            source={{
              uri: contextUser?.profilePic,
            }}
            size="md"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputFieldContainer}
          activeOpacity={0.6}
          onPress={() => navigate('AddPost')}>
          <Input
            isReadOnly
            borderRadius="full"
            placeholder={
              '  Write something here...' + '\n' + '  यहाँ कुछ लिखो...'
            }
            placeholderTextColor={COLORS.white2}
            fontSize="md"
            padding="3"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGetImageThenNavigate}>
          <PhotoIcon width="30" height="30" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default React.memo(HomeHeader)

const styles = StyleSheet.create({
  rightHeader: {
    backgroundColor: COLORS.gray3,
    borderRadius: 25,
    padding: 10,
  },
  inputFieldContainer: {
    width: '70%',
    height: '100%',
  },
  storyTextStyle: {
    color: COLORS.white,
    ...FONTS.body5,
  },
  searchIcon: {
    top: 20,
    bottom: 20,
    left: 50,
    right: 50,
  },
})

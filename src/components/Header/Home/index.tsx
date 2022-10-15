import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

import {
  Avatar,
  HStack,
  Input,
  ScrollView,
  Text as NText,
  View as NView,
} from 'native-base'
import auth from '@react-native-firebase/auth'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import InstaStory from 'react-native-insta-story'

import {COLORS, STORY_DATA} from '@/constants'
import useSelectImage from '@/hooks/useSelectImage'
import useUserData from '@/hooks/useUserData'
import {RootStackParamList} from '@/Navigation/Root'
import {PhotoIcon, SearchIcon} from '@/SVG'
import Story from '@/components/Story'

function HomeHeader() {
  const {contextUser} = useUserData()
  const {handleChooseGallary} = useSelectImage()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const handleGetImageThenNavigate = () => {
    handleChooseGallary(true, 'AddPost') // true to navigate
  }

  const user = auth().currentUser?.uid

  return (
    <NView mb="5" paddingX="2">
      <View style={styles.headerContainer}>
        <NView alignItems="center" flexDirection="row">
          <NText fontFamily="Lato-Bold" color={COLORS.primary} fontSize="2xl">
            Face
            <NText fontFamily="Lato-Bold" color={COLORS.white2} fontSize="2xl">
              Smash
            </NText>
          </NText>
          <NView
            ml="4"
            bgColor="primary.800"
            height="3"
            width="3"
            fontFamily="Lato-Bold"
            rounded="full"
          />
        </NView>

        <TouchableOpacity
          onPress={() => navigation.navigate('SearchUser')}
          style={styles.rightHeader}
          hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
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
            avatarTextStyle={{color: 'white', fontSize: 12}}
            // onStart={item => console.log(item)}
            // onClose={item => console.log('close: ', item)}
            customSwipeUpComponent={
              <View>
                <Text>Swipe</Text>
              </View>
            }
          />
        </HStack>
      </ScrollView>

      <NView
        justifyContent="space-around"
        flexDirection="row"
        alignItems="center">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {
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
          style={{width: '70%', height: '100%'}}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('AddPost', {})}>
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
      </NView>
    </NView>
  )
}

export default React.memo(HomeHeader)

const styles = StyleSheet.create({
  headerContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightHeader: {
    backgroundColor: COLORS.gray3,
    borderRadius: 25,
    padding: 10,
  },
})

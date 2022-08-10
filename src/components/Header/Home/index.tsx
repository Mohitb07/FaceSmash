import React, {useContext} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'

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

import {COLORS} from '../../../constants'
import {UserDataContext} from '../../../Context/userData'
import useSelectImage from '../../../hooks/useSelectImage'
import {PhotoIcon, SearchIcon} from '../../../SVG'
import Story from '../../Story'

interface navigation {
  navigate: (screen: string, params?: object) => void
}

function HomeHeader() {
  const {contextUser} = useContext(UserDataContext)
  const {handleChooseGallary} = useSelectImage()
  const navigation = useNavigation<navigation>()

  const handleGetImageThenNavigate = () => {
    // true for navigation
    handleChooseGallary(true, navigation)
  }

  const dummyStoryData = [
    {
      uri: 'https://media.istockphoto.com/photos/portrait-of-a-young-african-man-at-studio-high-fashion-male-model-in-picture-id1325359218?b=1&k=20&m=1325359218&s=170667a&w=0&h=MflA10Erq46yR-LFSREN6svtgXP7OeKuiBGXkYnBWls=',
      username: 'Drax',
      id: 1,
    },
    {
      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      username: 'Kyle',
      id: 2,
    },
    {
      uri: 'https://pbs.twimg.com/profile_images/1383196364792680448/N8CdupEu_400x400.jpg',
      username: 'Amber',
      id: 3,
    },
    {
      uri: 'https://www.musicraiser.com/wp-content/uploads/2019/10/28-2.jpg',
      username: 'Jennie',
      id: 4,
    },
    {
      uri: 'https://images.unsplash.com/photo-1609132718484-cc90df3417f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmFrZSUyMHdvbWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
      username: 'Emma',
      id: 5,
    },
    {
      uri: 'https://wpimg.pixelied.com/blog/wp-content/uploads/2021/06/15175913/Colors-in-Profile-Pictures.jpeg',
      username: 'Justin',
      id: 6,
    },
  ]

  return (
    <NView mb="10">
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
            bgColor={COLORS.primary}
            height="3"
            width="3"
            fontFamily="Lato-Bold"
            rounded="full"></NView>
        </NView>

        <View style={styles.rightHeader}>
          <TouchableOpacity
            hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
            <SearchIcon />
          </TouchableOpacity>
        </View>
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
          {dummyStoryData.map(({uri, username, id}) => (
            <Story key={id} uri={uri} username={username} />
          ))}
        </HStack>
      </ScrollView>

      <NView
        justifyContent="space-around"
        flexDirection="row"
        alignItems="center">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {
              providedUserId: auth()?.currentUser?.uid,
            })
          }>
          <Avatar
            source={{
              uri: contextUser?.profilePic,
            }}
            size="md"
          />
        </TouchableOpacity>
        <Input
          onPressIn={() => navigation.navigate('AddPost')}
          borderRadius="full"
          maxWidth="2/3"
          placeholder={
            '  Write something here...' + '\n' + '  यहाँ कुछ लिखो...'
          }
          placeholderTextColor={COLORS.white2}
          fontSize="md"
          padding="3"
        />
        <TouchableOpacity onPress={handleGetImageThenNavigate}>
          <PhotoIcon width="30" height="30" />
        </TouchableOpacity>
      </NView>
    </NView>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
    paddingHorizontal: 10,
  },
  scrollView: {},
  innerContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  headerContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 38,
    height: 38,
    borderRadius: 25,
    marginRight: 10,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightHeader: {
    backgroundColor: '#1F2124',
    borderRadius: 25,
    padding: 10,
  },
  userInfo: {
    flexDirection: 'column',
  },
  usernameText: {
    color: '#F2F2F2',
    fontSize: 15,
    fontWeight: 'bold',
  },
  email: {
    color: '#747474',
    fontSize: 12,
  },
  feedsContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  feedsLabel: {
    color: '#F2F2F2',
    fontSize: 35,
    fontWeight: 'bold',
  },
})

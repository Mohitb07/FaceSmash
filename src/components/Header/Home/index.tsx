import React, {useContext} from 'react'
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

import {COLORS} from '../../../constants'
import {UserDataContext} from '../../../Context/userData'
import useSelectImage from '../../../hooks/useSelectImage'
import {AddIcon, PhotoIcon, SearchIcon} from '../../../SVG'
import Story from '../../Story'
import InstaStory from 'react-native-insta-story'

interface navigation {
  navigate: (screen: string, params?: object) => void
}

const dummyStoryData = [
  {
    uri: 'https://media.istockphoto.com/photos/portrait-of-a-young-african-man-at-studio-high-fashion-male-model-in-picture-id1325359218?b=1&k=20&m=1325359218&s=170667a&w=0&h=MflA10Erq46yR-LFSREN6svtgXP7OeKuiBGXkYnBWls=',
    username: 'Drax',
    id: 1,
  },
  {
    uri: 'https://avatarfiles.alphacoders.com/109/109358.jpg',
    username: 'Alexandra Daddario',
    id: 2,
  },
  {
    uri: 'https://pbs.twimg.com/profile_images/1383196364792680448/N8CdupEu_400x400.jpg',
    username: 'Amber',
    id: 3,
  },
  {
    uri: 'https://vz.cnwimg.com/wp-content/uploads/2010/02/Emma-Watson.jpg',
    username: 'Emma Watson',
    id: 4,
  },
  {
    uri: 'https://images.unsplash.com/photo-1609132718484-cc90df3417f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmFrZSUyMHdvbWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    username: 'Jennie',
    id: 5,
  },
  {
    uri: 'https://www.udiscovermusic.com/wp-content/uploads/2020/06/Justin-Bieber-GettyImages-472253196-1000x600.jpg',
    username: 'Justin Bieber',
    id: 6,
  },
]

const data = [
  {
    user_id: 1,
    user_image: dummyStoryData[0].uri,
    user_name: dummyStoryData[0].username,
    stories: [
      {
        story_id: 1,
        story_image:
          'https://compote.slate.com/images/6c3b82cd-7910-4d13-842d-ebc0ca0718bd.jpeg?crop=1560%2C1040%2Cx0%2Cy0',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://images.unsplash.com/photo-1506634572416-48cdfe530110?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmxhY2slMjBtYWxlJTIwbW9kZWxzfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
      },
    ],
  },
  {
    user_id: 2,
    user_image: dummyStoryData[1].uri,
    user_name: dummyStoryData[1].username,
    stories: [
      {
        story_id: 1,
        story_image:
          'https://1.bp.blogspot.com/-0yo1zC_FbHo/X01UsK4IfZI/AAAAAAABgZQ/hJAOXdo8plQQd9oPJ1C4mgNCqfUFk-EogCLcBGAsYHQ/s1600/7-Alexandra%2BDaddario%2Bpictures%2Band%2Bphotos%2B%252819%2529.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://imageio.forbes.com/specials-images/imageserve/61e369cb959199c9d1b0f30d/Alexandra-Daddario/0x0.jpg?format=jpg&crop=1683,1684,x0,y346,safe&width=960',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 2 swiped'),
      },
    ],
  },
  {
    user_id: 3,
    user_image: dummyStoryData[2].uri,
    user_name: dummyStoryData[2].username,
    stories: [
      {
        story_id: 1,
        story_image:
          'https://www.pinkvilla.com/imageresize/amber_heard_aquaman_role_0.jpg?width=752&format=webp&t=pvorg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
    ],
  },
  {
    user_id: 4,
    user_image: dummyStoryData[3].uri,
    user_name: dummyStoryData[3].username,
    stories: [
      {
        story_id: 1,
        story_image:
          'https://www.greenqueen.com.hk/wp-content/uploads/2020/06/emma-watson-Gettyimages-Karwai-Tang-.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
    ],
  },
  {
    user_id: 5,
    user_image: dummyStoryData[4].uri,
    user_name: dummyStoryData[4].username,
    stories: [
      {
        story_id: 1,
        story_image:
          'https://images.unsplash.com/photo-1609132718484-cc90df3417f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmFrZSUyMHdvbWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
    ],
  },
  {
    user_id: 6,
    user_image: dummyStoryData[5].uri,
    user_name: dummyStoryData[5].username,
    stories: [
      {
        story_id: 1,
        story_image:
          'https://media.newyorker.com/photos/5e2b598351d1330009001749/master/w_2560%2Cc_limit/Fry-JustinBieberDocuseries.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
    ],
  },
]

function HomeHeader() {
  const {contextUser} = useContext(UserDataContext)
  const {handleChooseGallary} = useSelectImage()
  const navigation = useNavigation<navigation>()

  const handleGetImageThenNavigate = () => {
    handleChooseGallary(true, navigation) // true for navigation
  }

  return (
    <NView mb="5" paddingX="2" backgroundColor={COLORS.transparentBlack9}>
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
          {/* {dummyStoryData.map(({uri, username, id}) => (
            <Story key={id} uri={uri} username={username} />
          ))} */}
          <InstaStory
            unPressedBorderColor={COLORS.primary}
            data={data}
            duration={10}
            avatarTextStyle={{color: 'white'}}
            // onStart={item => console.log(item)}
            // onClose={item => console.log('close: ', item)}
            customSwipeUpComponent={
              <View>
                <Text>Swipe</Text>
              </View>
            }
            // style={{marginTop: 30}}
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
        <TouchableOpacity
          style={{width: '70%', height: '100%'}}
          onPress={() => navigation.navigate('AddPost')}>
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

export default HomeHeader

const styles = StyleSheet.create({
  headerContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightHeader: {
    backgroundColor: '#1F2124',
    borderRadius: 25,
    padding: 10,
  },
  storyText: {
    color: 'blue',
  },
})

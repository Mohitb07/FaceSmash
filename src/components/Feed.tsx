import firestore from '@react-native-firebase/firestore'
import {useNavigation} from '@react-navigation/native'
import dayjs from 'dayjs'
import {
  Actionsheet,
  HStack,
  Image,
  Spinner,
  ThreeDotsIcon,
  useDisclose,
  View as NView,
  VStack,
} from 'native-base'
import React, {useContext} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import {HeartFilledIcon, HeartOutlinIcon, LinkIcon} from '../SVG'

import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import relativeTime from 'dayjs/plugin/relativeTime'
import {COLORS} from '../constants'
import {AuthUserContext} from '../Context/auth'
import {RootStackParamList} from '../Navigation/Root'
import {FeedProps} from '../types'
const FeedMore = React.lazy(() => import('./BottomSheet/FeedMore'))

dayjs.extend(relativeTime)

const Feed = ({
  image,
  postTitle = '',
  username = '',
  userProfilePic,
  description = '',
  likes = 0,
  createdAt,
  postId = '',
  userId = '',
  link = '',
  hasUserLikedPost = false,
  imageRef,
}: FeedProps) => {
  console.log('feed', postTitle)
  const updateUIBasedOnImage = Boolean(image) ? 'column-reverse' : 'column'
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const {authUser} = useContext(AuthUserContext)
  const {onOpen, onClose, isOpen} = useDisclose()

  const handleLikes = () => {
    const postlikesRef = firestore()
      .collection('Users')
      .doc(authUser?.uid)
      .collection('postlikes')
      .doc(postId)

    const postRef = firestore().collection('Posts').doc(postId)
    const batch = firestore().batch()

    try {
      if (hasUserLikedPost) {
        batch.delete(postlikesRef)
        batch.update(postRef, {
          likes: firestore.FieldValue.increment(-1),
        })
        console.log('dis liked')
      } else {
        batch.set(postlikesRef, {
          likes: true,
          postId: postId,
        })
        batch.update(postRef, {
          likes: firestore.FieldValue.increment(1),
        })
        console.log('liked')
      }
      batch.commit()
    } catch (err) {
      console.log('handlelikes error', err)
    }
  }

  return (
    <NView style={styles.container}>
      <NView style={styles.userInfo}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {
              providedUserId: userId,
            })
          }
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={styles.userProfile}
            source={{uri: userProfilePic}}
            alt={username}
          />
          <View>
            <Text style={styles.usernameText}>{username}</Text>
          </View>
        </TouchableOpacity>
        {authUser?.uid === userId && (
          <TouchableOpacity onPress={onOpen}>
            <NView
              backgroundColor={COLORS.transparentBlack1}
              padding="3"
              rounded="full"
              style={{transform: [{rotate: '90deg'}]}}
              hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
              <ThreeDotsIcon />
            </NView>
          </TouchableOpacity>
        )}
      </NView>
      {/* POST IMAGE */}
      {Boolean(image) && (
        <NView style={styles.imageContainer}>
          <FastImage
            style={styles.image}
            source={{
              uri: image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </NView>
      )}

      {/* TITLE & DESCRIPTION */}
      <NView flexDirection={updateUIBasedOnImage}>
        <NView ml="2">
          {link.length > 0 ? (
            <TouchableOpacity
              style={styles.linkTitle}
              onPress={() =>
                navigation.navigate('Browser', {
                  uri: link,
                })
              }>
              <LinkIcon height="14" width="14" />
              <Text style={[styles.feedTitle, {marginLeft: 5}]}>
                {postTitle}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableWithoutFeedback>
              <Text style={styles.feedTitle}>{postTitle}</Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </NView>

        {/* USER INTERACTIONS */}
        <VStack space="2" mb="1" ml="1">
          <HStack alignItems="center">
            <TouchableOpacity onPress={handleLikes}>
              {hasUserLikedPost ? (
                <HeartFilledIcon height="22" />
              ) : (
                <HeartOutlinIcon height="22" />
              )}
            </TouchableOpacity>
          </HStack>
          <Text style={styles.likes}>{likes} likes</Text>
        </VStack>
      </NView>
      <NView ml="2%">
        <Text style={styles.timePosted}>
          {dayjs(createdAt?.toDate()).fromNow()}
        </Text>
      </NView>

      <Actionsheet disableOverlay isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content style={{backgroundColor: COLORS.mainBackground}}>
          <React.Suspense
            fallback={
              <View>
                <Spinner color="indigo.500" />
              </View>
            }>
            <FeedMore
              imageRef={imageRef}
              postId={postId}
              hasImage={Boolean(image)}
              onClose={() => onClose()}
              hasLiked={hasUserLikedPost}
            />
          </React.Suspense>
        </Actionsheet.Content>
      </Actionsheet>
    </NView>
  )
}

export default React.memo(Feed)

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparentBlack9,
    // maxHeight: 530,
    // borderRadius: 25,
    // marginTop: 10,
    // padding: 20,
    paddingTop: 1,
    paddingBottom: 10,
    marginVertical: 5,
    overflow: 'hidden',
    // paddingHorizontal: 15, -> this needs to be rolledback just in case
  },
  outerContainer: {
    paddingTop: 0,
  },
  feedInfo: {
    paddingVertical: 10,
  },
  feedTitle: {
    fontSize: 16,
    color: COLORS.white2,
    fontFamily: 'Lato-Heavy',
    lineHeight: 23,
  },
  usernameText: {
    color: COLORS.white2,
    fontSize: 15,
    fontFamily: 'Lato-Semibold',
  },
  imageContainer: {
    overflow: 'hidden',
    marginBottom: 5,
  },
  image: {
    aspectRatio: 3 / 2,
    width: '100%',
  },
  text: {
    color: 'white',
  },
  timePosted: {
    color: '#747474',
    fontSize: 10,
    fontFamily: 'Lato-Regular',
  },
  userProfile: {
    width: 38,
    height: 38,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 11,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  description: {
    color: '#747474',
    fontFamily: 'Lato-Semibold',
    fontSize: 11,
    marginVertical: 5,
  },
  titleNuser: {
    flexDirection: 'column-reverse',
  },
  likes: {
    color: COLORS.white,
    marginLeft: 5,
    fontFamily: 'Lato-Bold',
  },
  linkTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

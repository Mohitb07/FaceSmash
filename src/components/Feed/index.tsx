import React, {useState} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'

import {
  Actionsheet,
  HStack,
  Image,
  Spinner,
  ThreeDotsIcon,
  useDisclose,
  View,
  VStack,
  Text,
} from 'native-base'
import firestore from '@react-native-firebase/firestore'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import FastImage from 'react-native-fast-image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import {HeartFilledIcon, HeartOutlinIcon, LinkIcon} from '@/SVG'
import {COLORS, FONTS} from '@/constants'
import useAuthUser from '@/hooks/useAuthUser'
import {FeedProps} from '@/interface'
import {RootStackParamList} from '@/Navigation/Root'

const FeedMore = React.lazy(() => import('@/components/BottomSheet/FeedMore'))

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
  const updateUIBasedOnImage = image ? 'column-reverse' : 'column'
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const {user} = useAuthUser()
  const {onOpen, onClose, isOpen} = useDisclose()
  const [show, setShow] = useState(false)

  const handleLikes = () => {
    const postlikesRef = firestore()
      .collection('Users')
      .doc(user?.uid)
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
    <View
      backgroundColor={COLORS.transparentBlack9}
      paddingTop={1}
      paddingBottom={2}
      overflow="hidden">
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingLeft={2}
        paddingY={11}>
        <TouchableOpacity
          onPress={() =>
            navigate('Profile', {
              providedUserId: userId,
            })
          }
          style={styles.userContainer}>
          <Image
            style={styles.userProfile}
            source={{uri: userProfilePic}}
            alt={username}
          />
          <Text color={COLORS.white2} fontSize={14} fontFamily="Lato-Semibold">
            {username}
          </Text>
        </TouchableOpacity>
        {user?.uid === userId && (
          <TouchableOpacity onPress={onOpen}>
            <View
              backgroundColor={COLORS.transparentBlack1}
              padding="3"
              rounded="full"
              style={{transform: [{rotate: '90deg'}]}}
              hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
              <ThreeDotsIcon />
            </View>
          </TouchableOpacity>
        )}
      </View>
      {/* POST IMAGE */}
      {Boolean(image) && (
        <View overflow="hidden" mb={3}>
          <FastImage
            style={styles.image}
            source={{
              uri: image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            accessibilityLabel="post image"
          />
        </View>
      )}

      {/* TITLE & DESCRIPTION */}
      <View flexDirection={updateUIBasedOnImage}>
        <View ml="2">
          {link.length > 0 ? (
            <TouchableOpacity
              style={styles.linkTitle}
              onPress={() =>
                navigate('Browser', {
                  uri: link,
                })
              }>
              <LinkIcon height="14" width="14" />
              <Text style={styles.feedTitle}>{postTitle}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableWithoutFeedback>
              <Text style={styles.feedTitle}>{postTitle}</Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.description}>
            {description.slice(0, !show ? 80 : Infinity)}
          </Text>

          {description.length > 100 && (
            <Text style={styles.seeMore} onPress={() => setShow(prev => !prev)}>
              {show ? 'See Less' : 'See More'}
            </Text>
          )}
        </View>

        {/* USER INTERACTIONS */}
        <VStack space="1" mb="1" ml="1">
          <HStack alignItems="center">
            <TouchableOpacity onPress={handleLikes}>
              {hasUserLikedPost ? (
                <HeartFilledIcon height="22" />
              ) : (
                <HeartOutlinIcon height="22" />
              )}
            </TouchableOpacity>
          </HStack>
          <Text color={COLORS.white} ml={2} fontFamily="Lato-Bold">
            {likes} likes
          </Text>
        </VStack>
      </View>
      <View ml="2%">
        <Text style={styles.timePosted}>
          {dayjs(createdAt?.toDate()).fromNow()}
        </Text>
      </View>

      <Actionsheet disableOverlay isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content style={styles.actionSheetContent}>
          <React.Suspense
            fallback={
              <>
                <Spinner color="indigo.500" />
              </>
            }>
            <FeedMore
              imageRef={imageRef}
              postId={postId}
              hasImage={Boolean(image)}
              onClose={onClose}
              hasLiked={hasUserLikedPost}
            />
          </React.Suspense>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  )
}

export default React.memo(Feed)

const styles = StyleSheet.create({
  feedTitle: {
    color: COLORS.white2,
    lineHeight: 23,
    ...FONTS.normalTitle,
  },
  image: {
    aspectRatio: 1,
  },
  timePosted: {
    ...FONTS.body5,
    color: COLORS.lightGray2,
  },
  userProfile: {
    width: 38,
    height: 38,
    borderRadius: 25,
    marginRight: 10,
  },
  description: {
    color: COLORS.white2,
    marginVertical: 5,
    ...FONTS.h4,
  },
  linkTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeMore: {
    fontSize: 11,
    color: 'white',
    fontWeight: '600',
  },
  actionSheetContent: {
    backgroundColor: COLORS.mainBackground,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

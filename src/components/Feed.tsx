import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'
import {useNavigation} from '@react-navigation/native'
import moment from 'moment'
import {
  Actionsheet,
  HStack,
  Image,
  ThreeDotsIcon,
  useDisclose,
  View as NView,
  VStack,
} from 'native-base'
import React, {useContext, useEffect, useState} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import {HeartFilledIcon, HeartOutlinIcon, LinkIcon} from '../SVG'

import {COLORS} from '../constants'
import {AuthUserContext} from '../Context/auth'
import FeedMore from './BottomSheet/FeedMore'
import {RootStackParamList} from '../Navigation/Root'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

interface FeedProps {
  image?: string
  postTitle: string
  username: string
  userProfilePic: string
  description: string
  likes: number
  createdAt: FirebaseFirestoreTypes.Timestamp
  postId: string
  userId: string
  link?: string
  hasLiked: boolean
  userLikedPosts: Boolean
}

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
  hasLiked,
  userLikedPosts = false,
}: FeedProps) => {
  console.log('feed', postTitle)
  console.log('liked post ', postTitle, userLikedPosts)

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const {authUser} = useContext(AuthUserContext)
  const {onOpen, onClose, isOpen} = useDisclose()

  const handleOnDelete = () => {
    onClose()
  }

  const handleLikes = () => {
    const postlikesRef = firestore()
      .collection('Users')
      .doc(authUser?.uid)
      .collection('postlikes')
      .doc(postId)

    const postRef = firestore().collection('Posts').doc(postId)
    const batch = firestore().batch()

    try {
      if (userLikedPosts) {
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

  const updateUIBasedOnImage = !!image ? 'column-reverse' : 'column'

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
            {/* <Text style={styles.timePosted}>
              {moment(createdAt?.toDate()).fromNow()}
            </Text> */}
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
              {userLikedPosts ? (
                <HeartFilledIcon height="22" />
              ) : (
                <HeartOutlinIcon height="22" />
              )}
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <CommentOutlinedIcon style={{marginLeft: 4}} />
            </TouchableOpacity> */}
          </HStack>
          <Text style={styles.likes}>{likes} likes</Text>
        </VStack>
      </NView>
      <NView ml="2%">
        <Text style={styles.timePosted}>
          {moment(createdAt?.toDate()).fromNow()}
        </Text>
      </NView>
      <Actionsheet disableOverlay isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content style={{backgroundColor: COLORS.mainBackground}}>
          <FeedMore postId={postId} handleDelete={handleOnDelete} />
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
  innerContainerReverse: {
    // flexDirection: 'column-reverse',
  },
  feedInfo: {
    paddingVertical: 10,
  },
  feedTitle: {
    fontSize: 16,
    color: COLORS.white2,
    // fontWeight: 'bold',
    fontFamily: 'Lato-Heavy',
    lineHeight: 23,
  },
  usernameText: {
    color: COLORS.white2,
    fontSize: 15,
    // fontWeight: 'bold',
    fontFamily: 'Lato-Semibold',
  },
  imageContainer: {
    // height: 250,
    // borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 5,
  },
  image: {
    // width: '50%',
    // height: '',
    // height: '50%',
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
    // fontWeight: '700',
    marginLeft: 5,
    fontFamily: 'Lato-Bold',
  },
  linkTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

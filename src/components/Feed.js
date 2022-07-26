import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {
  HeartOutlinIcon,
  HeartFilledIcon,
  CommentIcon,
  CommentOutlinedIcon,
  LinkIcon,
} from '../SVG';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import {
  Actionsheet,
  Box,
  HStack,
  Image,
  ThreeDotsIcon,
  useDisclose,
  View as NView,
  VStack,
} from 'native-base';

import {COLORS, SIZES} from '../constants';
import FeedMore from './BottomSheet/FeedMore';
import {AuthUserContext} from '../Context/auth';
import LinearGradient from 'react-native-linear-gradient';

const Feed = ({
  image,
  postTitle = '',
  username = '',
  userProfilePic,
  navigation,
  description = '',
  likes = 0,
  createdAt,
  postId = '',
  userId = '',
  post,
  link = '',
  hasLiked: likedStatus,
}) => {
  console.log('feed', postTitle);
  const {authUser} = useContext(AuthUserContext);
  const {onOpen, onClose, isOpen} = useDisclose();
  const [hasLiked, setHasLiked] = useState(likedStatus);
  const [likesCounter, setLikesCounter] = useState(likes);

  useEffect(() => {
    setHasLiked(likedStatus);
  }, [likedStatus]);

  const handleLikes = async () => {
    try {
      const userDocRef = firestore()
        .collection('Users')
        .doc(authUser?.uid)
        .collection('postlikes')
        .doc(postId);
      const postRef = firestore().collection('Posts').doc(postId);

      let isExistingPost;
      await userDocRef.get().then(doc => {
        if (doc.exists) {
          console.log('existing');
          isExistingPost = true;
        } else {
          console.log('not existing');
          isExistingPost = false;
        }
      });
      const batch = firestore().batch();

      if (!isExistingPost) {
        console.log('inside if');
        try {
          setHasLiked(true);
          setLikesCounter(prev => (prev += 1));
          // remove the user id from the user doc
          batch.set(userDocRef, {
            postId: postId,
            liked: true,
          });
          // increment the counter of likes in posts collection
          batch.update(postRef, {
            likes: firestore.FieldValue.increment(1),
          });
        } catch (error) {
          setHasLiked(false);
          setLikesCounter(prev => (prev -= 1));
        }
      } else {
        console.log('inside else');
        try {
          setHasLiked(false);
          setLikesCounter(prev => (prev -= 1));
          // add the user id to the user doc
          batch.delete(userDocRef);
          // decrement the counter of likes in posts collection
          batch.update(postRef, {
            likes: firestore.FieldValue.increment(-1),
          });
        } catch (error) {
          setHasLiked(true);
          setLikesCounter(prev => (prev += 1));
        }
      }
      batch.commit(() => console.log('operation completed'));
    } catch (err) {
      console.log('handlelikes error', err.message);
    }
  };

  const updateUIBasedOnImage = !!image ? 'column-reverse' : 'column';

  return (
    // <LinearGradient
    //   start={{x: 0, y: 1}}
    //   end={{x: 0, y: 10}}
    //   colors={['#262A2D', '#2F3033']}
    //   style={styles.container}>
    //   <View
    //     style={[styles.innerContainer, !image && styles.innerContainerReverse]}>
    //     {!!image && (
    //       <View style={styles.imageContainer}>
    //         <FastImage
    //           style={styles.image}
    //           source={{
    //             uri: image,
    //             priority: FastImage.priority.normal,
    //           }}
    //         />
    //       </View>
    //     )}

    //     <View>
    //       <Box
    //         flexDirection="row"
    //         alignItems="center"
    //         justifyContent="space-between">
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             paddingVertical: 10,
    //             alignItems: 'center',
    //           }}>
    //           <TouchableOpacity onPress={handleLikes}>
    //             {hasLiked ? <HeartFilledIcon /> : <HeartOutlinIcon />}
    //           </TouchableOpacity>
    //           <TouchableOpacity>
    //             <CommentOutlinedIcon style={{marginLeft: 4}} />
    //           </TouchableOpacity>
    //         </View>
    //       </Box>

    //       <Text style={styles.likes}>{likesCounter} likes</Text>
    //     </View>

    //     <View style={Boolean(image) && styles.feedInfo}>
    //       <View style={!image && styles.titleNuser}>
    //         {link.length > 0 ? (
    //           <TouchableOpacity
    //             style={styles.linkTitle}
    //             onPress={() =>
    //               navigation.navigate('Browser', {
    //                 uri: link,
    //               })
    //             }>
    //             <LinkIcon height="14" width="14" />
    //             <Text style={[styles.feedTitle, {marginLeft: 5}]}>
    //               {postTitle}
    //             </Text>
    //           </TouchableOpacity>
    //         ) : (
    //           <TouchableWithoutFeedback>
    //             <Text style={styles.feedTitle}>{postTitle}</Text>
    //           </TouchableWithoutFeedback>
    //         )}
    //         <NView style={styles.userInfo}>
    //           <TouchableOpacity
    //             onPress={() =>
    //               navigation.navigate('Profile', {
    //                 providedUserId: userId,
    //               })
    //             }
    //             style={{flexDirection: 'row', alignItems: 'center'}}>
    //             <Image
    //               style={styles.userProfile}
    //               source={{uri: userProfilePic}}
    //               alt={username}
    //             />
    //             <View>
    //               <Text style={styles.usernameText}>{username}</Text>
    //               <Text style={styles.timePosted}>
    //                 {moment(createdAt?.toDate()).fromNow()}
    //               </Text>
    //             </View>
    //           </TouchableOpacity>
    //           {authUser?.uid === userId && (
    //             <TouchableOpacity onPress={onOpen}>
    //               <NView
    //                 backgroundColor={COLORS.transparentGray}
    //                 padding="3"
    //                 rounded="full"
    //                 hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
    //                 <ThreeDotsIcon />
    //               </NView>
    //             </TouchableOpacity>
    //           )}
    //         </NView>
    //       </View>
    //       <Text style={styles.description} numberOfLines={2}>
    //         {description}
    //       </Text>
    //     </View>
    //   </View>
    //   <Actionsheet disableOverlay isOpen={isOpen} onClose={onClose}>
    //     <Actionsheet.Content>
    //       <FeedMore />
    //     </Actionsheet.Content>
    //   </Actionsheet>
    // </LinearGradient>
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
            <Text style={styles.timePosted}>
              {moment(createdAt?.toDate()).fromNow()}
            </Text>
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
          />
        </NView>
      )}

      {/* TITLE & DESCRIPTION */}
      <NView flexDirection={updateUIBasedOnImage}>
        <NView>
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
        <VStack space="2" mb="1">
          <HStack alignItems="center">
            <TouchableOpacity onPress={handleLikes}>
              {hasLiked ? (
                <HeartFilledIcon height="22" />
              ) : (
                <HeartOutlinIcon height="22" />
              )}
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <CommentOutlinedIcon style={{marginLeft: 4}} />
            </TouchableOpacity> */}
          </HStack>
          <Text style={styles.likes}>{likesCounter} likes</Text>
        </VStack>
      </NView>
      <Actionsheet disableOverlay isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <FeedMore />
        </Actionsheet.Content>
      </Actionsheet>
    </NView>
  );
};

export default React.memo(Feed);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparentBlack9,
    // maxHeight: 530,
    borderRadius: 25,
    // marginTop: 10,
    // padding: 20,
    paddingTop: 1,
    paddingBottom: 10,
    marginVertical: 5,
    overflow: 'hidden',
    paddingHorizontal: 15,
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
    fontWeight: 'bold',
  },
  imageContainer: {
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
  },
  timePosted: {
    color: '#747474',
    fontSize: 12,
  },
  userProfile: {
    width: 38,
    height: 38,
    borderRadius: 25,
    marginRight: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 11,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontWeight: '700',
    marginLeft: 5,
  },
  linkTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

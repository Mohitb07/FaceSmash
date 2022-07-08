import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  HeartOutlinIcon,
  HeartFilledIcon,
  CommentIcon,
  CommentOutlinedIcon,
} from '../SVG';
import {COLORS} from '../constants';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {useRecoilState} from 'recoil';
import {postState} from '../atoms/postAtom';
import FastImage from 'react-native-fast-image';

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
  onLike,
  post,
}) => {
  console.log('feed', postTitle);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const handleLikes = () => {
    try {
      onLike(postId, post);
    } catch (err) {
      console.log('handlelikes error', err.message);
    }
  };

  const isLiked = postStateValue.postLikes.find(item => item.postId === postId);

  return (
    <View style={[styles.container, !image && styles.outerContainer]}>
      <View
        style={[styles.innerContainer, !image && styles.innerContainerReverse]}>
        {!!image && (
          <View style={styles.imageContainer}>
            {/* <Image
              source={{
                uri: image,
              }}
              resizeMode="cover"
              style={styles.image}
            /> */}
            <FastImage
              style={styles.image}
              source={{
                uri: image,
                // headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
              }}
            />
          </View>
        )}

        <View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={handleLikes}>
              {isLiked ? <HeartFilledIcon /> : <HeartOutlinIcon />}
            </TouchableOpacity>
            <TouchableOpacity>
              <CommentOutlinedIcon style={{marginLeft: 4}} />
            </TouchableOpacity>
          </View>

          <Text style={styles.likes}>{likes} likes</Text>
        </View>

        <View style={styles.feedInfo}>
          <View style={!image && styles.titleNuser}>
            <TouchableOpacity>
              <Text style={styles.feedTitle}>{postTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Profile', {
                  providedUserId: userId,
                })
              }
              style={styles.userInfo}>
              {/* <Image
                source={{
                  uri: userProfilePic,
                }}
                style={styles.userProfile}
                resizeMode="cover"
              /> */}
              <FastImage
                style={styles.userProfile}
                source={{
                  uri: userProfilePic,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View>
                <Text style={styles.usernameText}>{username}</Text>
                <Text style={styles.timePosted}>
                  {moment(createdAt?.toDate()).fromNow()}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(Feed);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    // maxHeight: 530,
    borderRadius: 25,
    marginTop: 10,
    padding: 20,
    paddingTop: 15,
    paddingBottom: 10,
    overflow: 'hidden',
  },
  outerContainer: {
    paddingTop: 0,
  },
  innerContainerReverse: {
    flexDirection: 'column-reverse',
  },
  feedInfo: {
    paddingVertical: 10,
  },
  feedTitle: {
    fontSize: 20,
    color: '#F2F2F2',
    fontWeight: 'bold',
    lineHeight: 23,
  },
  usernameText: {
    color: '#F2F2F2',
    fontSize: 15,
    fontWeight: 'bold',
  },
  imageContainer: {
    height: 300,
    borderRadius: 25,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
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
    borderRadius: 15,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 11,
  },
  description: {
    color: '#747474',
  },
  titleNuser: {
    flexDirection: 'column-reverse',
  },
  likes: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {
  HeartOutlinIcon,
  HeartFilledIcon,
  CommentIcon,
  CommentOutlinedIcon,
} from '../SVG';
import {COLORS} from '../constants';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

const Feed = ({
  image,
  postTitle = '',
  username = '',
  userProfilePic,
  navigation,
  description = '',
  likes = [],
  createdAt,
  postId = '',
  userId = '',
}) => {
  console.log('Feed Renders', postId);

  const handleLikes = () => {
    if (!likes.includes(userId)) {
      firestore()
        .collection('Posts')
        .doc(postId)
        .update({
          likes: [...likes, userId],
        })
        .then(() => {
          console.log('Posts Liked');
        });
    } else {
      firestore()
        .collection('Posts')
        .doc(postId)
        .update({
          likes: likes.filter(item => item !== userId),
        })
        .then(() => {
          console.log('Posts UnLiked');
        });
    }
  };
  return (
    <View style={[styles.container, !image && styles.outerContainer]}>
      <View
        style={[styles.innerContainer, !image && styles.innerContainerReverse]}>
        {!!image && (
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: image,
              }}
              resizeMode="cover"
              style={styles.image}
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
              {likes.includes(userId) ? (
                <HeartFilledIcon />
              ) : (
                <HeartOutlinIcon />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              <CommentOutlinedIcon style={{marginLeft: 4}} />
            </TouchableOpacity>
          </View>

          <Text style={styles.likes}>{likes.length} likes</Text>
        </View>

        <View style={styles.feedInfo}>
          <View style={!image && styles.titleNuser}>
            <TouchableOpacity>
              <Text style={styles.feedTitle}>{postTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={styles.userInfo}>
              <Image
                source={{
                  uri: userProfilePic,
                }}
                style={styles.userProfile}
                resizeMode="cover"
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

export default Feed;

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
  innerContainer: {
    // backgroundColor: 'red',
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

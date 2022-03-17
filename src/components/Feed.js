import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {HeartIcon, CommentIcon} from '../SVG';

const Feed = ({image, postTitle}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.innerContainer}>
        {image && (
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

        <View
          style={{
            flexDirection: 'row',
            paddingTop: 10,
            alignItems: 'center',
          }}>
          <HeartIcon />
          <CommentIcon />
        </View>

        <View style={styles.feedInfo}>
          <Text style={styles.feedTitle}>{postTitle}</Text>
          <View style={styles.userInfo}>
            <Image
              source={{
                uri: 'http://thenewcode.com/assets/images/thumbnails/sarah-parmenter.jpeg',
              }}
              style={styles.userProfile}
              resizeMode="cover"
            />
            <View>
              <Text style={styles.usernameText}>Sajon Islam</Text>
              <Text style={styles.timePosted}>2 min ago</Text>
            </View>
          </View>
          <Text style={styles.description} numberOfLines={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202124',
    // height: 100,
    maxHeight: 500,
    borderRadius: 25,
    marginTop: 10,
    padding: 20,
  },
  innerContainer: {
    // maxHeight: 400,
  },
  feedInfo: {
    paddingVertical: 5,
  },
  feedTitle: {
    fontSize: 20,
    color: '#F2F2F2',
    fontWeight: 'bold',
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
    paddingVertical: 10,
  },
  description: {
    color: '#747474',
  },
});

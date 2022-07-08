import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useContext} from 'react';
import {UserDataContext} from '../../Context/userData';
import {AddIcon} from '../../SVG';
import FastImage from 'react-native-fast-image';

function PostHeader({navigation, loading = false}) {
  const {contextUser} = useContext(UserDataContext);
  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.leftHeader}
          onPress={() =>
            navigation.navigate('Profile', {
              providedUserId: contextUser.uid,
            })
          }>
          {/* <Image
            source={{
              uri: contextUser?.profilePic,
            }}
            style={styles.image}
            resizeMode="cover"
          /> */}
          <FastImage
            style={styles.image}
            source={{
              uri: contextUser?.profilePic,
              // headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.userInfo}>
            <Text style={styles.usernameText}>{contextUser?.username}</Text>
            <Text style={styles.email}>{contextUser?.email}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.rightHeader}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Add Post')}
            style={styles.searchIcon}>
            <AddIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.feedsContainer}>
        <Text style={styles.feedsLabel}>Trending</Text>
      </View>
      {loading && (
        <View>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 30,
            }}>
            <ActivityIndicator />
          </Text>
        </View>
      )}
    </>
  );
}

export default PostHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    paddingHorizontal: 20,
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
});

import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Feed from '../../components/Feed';
import fakeData from '../../assets/fakeData.json';

import {SearchIcon} from '../../SVG';
import {UserDataContext} from '../../Context/userData';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = ({navigation}) => {
  const {userData} = useContext(UserDataContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  console.log('fake fdata', fakeData);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.leftHeader}
              onPress={() => navigation.navigate('Profile')}>
              <Image
                source={{
                  uri: userData?.profilePic,
                }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.userInfo}>
                <Text style={styles.usernameText}>{userData?.username}</Text>
                <Text style={styles.email}>{userData?.email}</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.rightHeader}>
              <TouchableOpacity style={styles.searchIcon}>
                <SearchIcon />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.feedsContainer}>
            <Text style={styles.feedsLabel}>Trending</Text>
            {fakeData.posts.map(post => (
              <Feed
                userProfilePic={post.userProfile}
                postTitle={post.title}
                image={post.image}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    paddingHorizontal: 20,
  },
  scrollView: {
    // flex: 1,
  },
  innerContainer: {
    flex: 1,
    // backgroundColor: 'green',
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

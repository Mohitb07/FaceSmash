import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Feed from '../../components/Feed';
import {SearchIcon, AddIcon} from '../../SVG';
import {UserDataContext} from '../../Context/userData';
import useGetAllPosts from '../../hooks/getAllPosts';

const Home = ({navigation}) => {
  const [posts, loading, userData, getLatestPosts, setPosts, setLoading] =
    useGetAllPosts();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    setRefreshing(true);
    setPosts([]);
    getLatestPosts();
    setRefreshing(false);
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('Posts')
  //     .orderBy('createdAt', 'desc')
  //     .onSnapshot(querySnapshot => {
  //       const allPosts = [];

  //       querySnapshot.forEach(documentSnapshot => {
  //         allPosts.push({
  //           ...documentSnapshot.data(),
  //           key: documentSnapshot.id,
  //           userProfile: userData.profilePic,
  //         });
  //       });

  //       setPosts(allPosts);
  //       setLoading(false);
  //     });

  //   return () => subscriber();
  // }, [userData]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {posts && (
          <FlatList
            data={posts}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={() => (
              <>
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
                      <Text style={styles.usernameText}>
                        {userData?.username}
                      </Text>
                      <Text style={styles.email}>{userData?.email}</Text>
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
                      Loading ....
                    </Text>
                  </View>
                )}
              </>
            )}
            renderItem={({item}) => (
              <Feed
                key={item.key}
                userProfilePic={item.userProfile}
                createdAt={item.createdAt}
                username={item.username}
                postTitle={item.title}
                image={item.image}
                description={item.description}
                navigation={navigation}
                likes={item.likes}
              />
            )}
          />
        )}
      </View>
    </View>
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

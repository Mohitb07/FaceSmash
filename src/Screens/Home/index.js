import React, {useCallback, useContext, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Feed from '../../components/Feed';
import useGetAllPosts from '../../hooks/getAllPosts';
import {AddIcon} from '../../SVG';

const Home = ({navigation}) => {
  const [posts, loading, contextUser, getLatestPosts, setPosts, setLoading] =
    useGetAllPosts();
  const [refreshing, setRefreshing] = useState(false);

  console.log('posts', posts);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPosts([]);
    getLatestPosts();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={() => (
            <>
              <View style={styles.headerContainer}>
                <TouchableOpacity
                  style={styles.leftHeader}
                  onPress={() =>
                    navigation.navigate('Profile', {
                      providedUserId: contextUser.uid,
                    })
                  }>
                  <Image
                    source={{
                      uri: contextUser?.profilePic,
                    }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={styles.userInfo}>
                    <Text style={styles.usernameText}>
                      {contextUser?.username}
                    </Text>
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
          )}
          renderItem={({item}) => (
            <Feed
              key={item.key}
              postId={item.key}
              userProfilePic={item.userProfile}
              createdAt={item.createdAt}
              username={item.username}
              postTitle={item.title}
              image={item.image}
              description={item.description}
              navigation={navigation}
              likes={item.likes}
              userId={item.user}
            />
          )}
        />
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

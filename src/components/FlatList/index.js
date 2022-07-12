import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import Feed from '../Feed';
import PostHeader from '../PostHeader';
import {useRecoilState} from 'recoil';
import {postState} from '../../atoms/postAtom';
import firestore from '@react-native-firebase/firestore';
import {authState} from '../../atoms/authAtom';
import {Text, View} from 'native-base';
import FeedSkeleton from '../FeedSkeleton';
import {COLORS} from '../../constants';
import {useFocusEffect} from '@react-navigation/native';
import {AuthUserContext} from '../../Context/auth';

function CustomFlatList({navigation}) {
  console.log('flat list');
  // const [onPostLike] = usePosts();
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const {authUser} = useContext(AuthUserContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userLikedPosts, setUserLikedPosts] = useState([]);

  const getPosts = useCallback(async () => {
    setPostStateValue(prev => ({
      ...prev,
      posts: [],
    }));
    try {
      const allPosts = await firestore()
        .collection('Posts')
        .orderBy('createdAt', 'desc')
        .get();

      const latestPost = [];
      allPosts.docs.map(item => {
        latestPost.push({
          ...item.data(),
          key: item.id,
        });
      });

      setPostStateValue(prev => ({
        ...prev,
        posts: latestPost,
      }));
      setLoading(false);
    } catch (error) {
      console.log('getPosts error', error);
      setLoading(false);
    }
    // .onSnapshot(querySnapshot => {
    //   const allPosts = [];

    //   querySnapshot.forEach(documentSnapshot => {
    //     allPosts.push({
    //       ...documentSnapshot.data(),
    //       key: documentSnapshot.id,
    //     });
    //   });

    //   setPostStateValue(allPosts);
    //   setLoading(false);
    // });
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const getUserLikedPosts = useCallback(async () => {
    // get user's liked posts
    try {
      const userLikedPosts = await firestore()
        .collection('Users')
        .doc(authUser?.uid)
        .collection('postlikes')
        .get();

      const postsLiked = [];
      userLikedPosts.docs.map(doc => postsLiked.push(doc.data()));

      setUserLikedPosts(postsLiked);
    } catch (err) {
      console.log('getLikedposterror', err.message);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);
    await getPosts();
    await getUserLikedPosts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getUserLikedPosts();
  }, []);

  const renderItem = ({item}) => (
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
      likes={postStateValue.posts.find(post => post.key === item.key)?.likes}
      userId={item.user}
      hasLiked={userLikedPosts.find(post => post.postId === item.key)?.liked}
      post={item}
      link={item?.link}
      // onDelete={onPostDelete}
      // onUpdate={onPostUpdate}
    />
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={postStateValue.posts}
      ListEmptyComponent={
        loading ? (
          <>
            <FeedSkeleton />
            <FeedSkeleton />
            <FeedSkeleton />
          </>
        ) : (
          <Text
            textAlign="center"
            color={COLORS.white}
            fontSize={20}
            marginTop={20}>
            Not Enough Posts
          </Text>
        )
      }
      ListFooterComponent={
        postStateValue.posts.length > 0 && (
          <View paddingY="5">
            <Text textAlign="center" color="gray.500">
              No More post
            </Text>
          </View>
        )
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={
        <PostHeader navigation={navigation} loading={loading} />
      }
      renderItem={renderItem}
    />
  );
}

export default React.memo(CustomFlatList);

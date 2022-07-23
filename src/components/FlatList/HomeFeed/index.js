import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'native-base';

import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import {useRecoilState} from 'recoil';
import firestore from '@react-native-firebase/firestore';

import Feed from '../../Feed';
import HomeHeader from '../../Header/Home';
import {postState} from '../../../atoms/postAtom';
import FeedSkeleton from '../../FeedSkeleton';
import {COLORS} from '../../../constants';
import useLikedPosts from '../../../hooks/useLikedPosts';

const LIMIT = 5;

function HomeFeed({navigation}) {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {userLikedPosts, refetch} = useLikedPosts();
  const [lastVisible, setLastVisible] = useState(null);

  const getPosts = useCallback(async () => {
    console.log('get posts called');
    setPostStateValue(prev => ({
      ...prev,
      posts: [],
    }));
    try {
      const allPosts = await firestore()
        .collection('Posts')
        .orderBy('createdAt', 'desc')
        .limit(LIMIT)
        .get();

      const latestPost = [];
      allPosts.docs.map(item => {
        latestPost.push({
          ...item.data(),
          key: item.id,
        });
      });

      let lastVisibleDoc = allPosts.docs[allPosts.docs.length - 1];

      console.log('last visible doc id in getPosts', lastVisibleDoc);

      setPostStateValue(prev => ({
        ...prev,
        posts: latestPost,
      }));
      setLastVisible(lastVisibleDoc);
      setLoading(false);
    } catch (error) {
      console.log('getPosts error', error);
      setLoading(false);
    }
  }, []);

  const retrieveMore = async () => {
    console.log('invoked');
    console.log('before invocation lastVisible value', lastVisible);
    if (!lastVisible) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const allPosts = await firestore()
        .collection('Posts')
        .orderBy('createdAt', 'desc')
        .startAfter(lastVisible)
        .limit(LIMIT)
        .get();

      const latestPost = [];
      allPosts.docs.map(item => {
        latestPost.push({
          ...item.data(),
          key: item.id,
        });
      });

      let lastVisibleDoc = allPosts.docs[allPosts.docs.length - 1];

      console.log('final result', [...postStateValue.posts, ...latestPost]);

      setPostStateValue(prev => ({
        ...prev,
        posts: [...postStateValue.posts, ...latestPost],
      }));
      setLastVisible(lastVisibleDoc);
      setLoading(false);
    } catch (error) {
      throw new Error('Retrieve More Error', error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const onRefresh = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);
    await getPosts();
    refetch();
    setRefreshing(false);
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
      // TODO : -
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
            {loading ? (
              <FeedSkeleton />
            ) : (
              <Text textAlign="center" color="gray.500">
                No More post
              </Text>
            )}
          </View>
        )
      }
      onEndReached={retrieveMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          progressBackgroundColor={COLORS.neon}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      ListHeaderComponent={
        <HomeHeader navigation={navigation} loading={loading} />
      }
      renderItem={renderItem}
      refreshing={loading}
    />
  );
}

export default React.memo(HomeFeed);

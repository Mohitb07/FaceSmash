import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'native-base';

import {FlatList, RefreshControl} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Feed from '../../Feed';
import HomeHeader from '../../Header/Home';
import FeedSkeleton from '../../FeedSkeleton';
import {COLORS} from '../../../constants';
import useLikedPosts from '../../../hooks/useLikedPosts';
import usePostsQuery from '../../../hooks/usePostsQuery';

const LIMIT = 5;

function HomeFeed({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const {userLikedPosts, refetch} = useLikedPosts();
  const {
    postStateValue,
    loading,
    lastVisible,
    getPosts,
    setPostStateValue,
    setLoading,
    setLastVisible,
  } = usePostsQuery();

  useEffect(() => {
    getPosts();
  }, []);

  const retrieveMore = async () => {
    if (!lastVisible) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
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
      setPostStateValue(prev => ({
        ...prev,
        posts: [...postStateValue.posts, ...latestPost],
      }));
      setLastVisible(lastVisibleDoc);
      setLoading(false);
    } catch (error) {
      console.log('getPosts error', error);
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);
    await getPosts();
    refetch(); //on refresh refetch all liked posts of the current user
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
          progressBackgroundColor={COLORS.primary}
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.white2]}
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

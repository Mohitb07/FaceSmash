import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'native-base';

import {FlatList, RefreshControl} from 'react-native';
import {useRecoilState} from 'recoil';
import firestore from '@react-native-firebase/firestore';

import Feed from '../../Feed';
import HomeHeader from '../../Header/Home';
import {postState} from '../../../atoms/postAtom';
import FeedSkeleton from '../../FeedSkeleton';
import {COLORS} from '../../../constants';
import useLikedPosts from '../../../hooks/useLikedPosts';

function CustomFlatList({navigation}) {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {userLikedPosts, refetch} = useLikedPosts();

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
  }, []);

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
            <Text textAlign="center" color="gray.500">
              No More post
            </Text>
          </View>
        )
      }
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
    />
  );
}

export default React.memo(CustomFlatList);

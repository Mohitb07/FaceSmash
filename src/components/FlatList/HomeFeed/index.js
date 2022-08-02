import {Text, View} from 'native-base'
import React from 'react'

import {FlatList, RefreshControl} from 'react-native'

import {COLORS} from '../../../constants'
import usePostsQuery from '../../../hooks/usePostsQuery'
import Feed from '../../Feed'
import FeedSkeleton from '../../FeedSkeleton'
import HomeHeader from '../../Header/Home'

function HomeFeed({navigation}) {
  const {
    postStateValue,
    loading,
    onRefresh,
    userLikedPosts,
    refreshing,
    retrieveMore,
  } = usePostsQuery()

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
  )

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
      onEndReached={() => retrieveMore()}
      onEndReachedThreshold={0.1}
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
  )
}

export default React.memo(HomeFeed)

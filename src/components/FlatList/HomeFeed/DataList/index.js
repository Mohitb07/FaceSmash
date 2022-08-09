import React, {useEffect, useRef} from 'react'
import {FlatList, RefreshControl} from 'react-native'
import {COLORS} from '../../../../constants'
import Feed from '../../../Feed'

const DataList = ({
  dataList = [],
  Header,
  Footer,
  EmptyList,
  retrieveMore = () => {},
  onRefresh = () => {},
  refreshing = false,
  loading = false,
  userLikedPosts = [],
}) => {
  console.log('home feed data list render')
  const renderItems = ({item}) => (
    <Feed
      key={item.key}
      postId={item.key}
      userProfilePic={item?.userProfile}
      createdAt={item.createdAt}
      username={item.username}
      postTitle={item.title}
      image={item.image}
      description={item.description}
      likes={dataList.find(post => post.key === item.key).likes}
      userId={item.user}
      hasLiked={userLikedPosts.find(post => post.postId === item.key)?.liked}
      post={item}
      link={item?.link}
    />
  )

  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 20}}
      showsVerticalScrollIndicator={false}
      data={dataList}
      ListEmptyComponent={EmptyList}
      ListHeaderComponent={Header}
      ListFooterComponent={Footer}
      onEndReached={retrieveMore}
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl
          progressBackgroundColor={COLORS.primary}
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.white2]}
        />
      }
      refreshing={loading}
      renderItem={renderItems}
    />
  )
}

export default DataList

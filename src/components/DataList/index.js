import React from 'react'
import {FlatList, RefreshControl} from 'react-native'
import {COLORS} from '../../constants'
import EmptyList from '../DataList/EmptyDataList'
import Feed from '../Feed'
import Footer from '../FlatList/HomeFeed/DataListFooter'
import ProfileHeader from '../Header/Profile'

const DataList = ({
  dataList = [],
  // Header,
  // Footer,
  // EmptyList,
  retrieveMore = () => {},
  onRefresh = () => {},
  refreshing = false,
  loading = false,
  userLikedPosts = [],
  userId = '',
}) => {
  console.log('profile data list render')
  console.log('user liked posts render', userLikedPosts)
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
      // hasLiked={userLikedPosts.find(post => post.postId === item.key)?.liked}
      userLikedPosts={!!userLikedPosts.find(post => post.postId === item.key)}
      post={item}
      link={item?.link}
    />
  )
  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 20}}
      showsVerticalScrollIndicator={false}
      data={dataList}
      ListEmptyComponent={<EmptyList loading={loading} />}
      ListHeaderComponent={
        <ProfileHeader totalPosts={dataList?.length} userId={userId} />
      }
      ListFooterComponent={<Footer dataList={dataList} loading={loading} />}
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

export default React.memo(DataList)

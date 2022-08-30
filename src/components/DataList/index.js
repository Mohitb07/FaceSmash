import {Divider} from 'native-base'
import React from 'react'
import {FlatList, RefreshControl} from 'react-native'
import {COLORS} from '../../constants'
import Feed from '../Feed'

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
  const renderItems = ({item}) => (
    <Feed
      postId={item.key}
      userProfilePic={item?.userProfile}
      createdAt={item.createdAt}
      username={item.username}
      postTitle={item.title}
      image={item.image}
      description={item.description}
      likes={dataList.find(post => post.key === item.key).likes}
      userId={item.user}
      userLikedPosts={!!userLikedPosts.find(post => post.postId === item.key)}
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
      ItemSeparatorComponent={() => (
        <Divider
          my="2"
          _dark={{
            bg: 'muted.800',
          }}
        />
      )}
      refreshing={loading}
      renderItem={renderItems}
      keyExtractor={item => item.key}
    />
  )
}

export default React.memo(DataList)

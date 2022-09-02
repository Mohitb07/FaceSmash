import React from 'react'
import {FlatList, RefreshControl, StyleSheet} from 'react-native'
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
      imageRef={item?.imageRef}
    />
  )
  return (
    <FlatList
      contentContainerStyle={styles.container}
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
      keyExtractor={item => item.key}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
})

export default React.memo(DataList)

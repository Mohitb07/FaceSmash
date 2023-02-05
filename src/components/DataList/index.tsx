import React, {ReactElement} from 'react'
import {FlatList, RefreshControl, StyleSheet} from 'react-native'

import {COLORS} from '@/constants'
import useLikedPosts from '@/hooks/useLikedPosts'
import {IPost, IPostLikes} from '@/interface'
import Feed from '@/components/Feed'

interface IDataListProps {
  dataList: IPost[]
  Header: ReactElement
  Footer: ReactElement
  EmptyList: ReactElement
  retrieveMore: () => void
  onRefresh?: () => void
  refreshing?: boolean
}

const DataList = ({
  dataList = [],
  Header,
  Footer,
  EmptyList,
  retrieveMore = () => {},
  onRefresh = () => {},
  refreshing = false,
}: IDataListProps) => {
  const {userLikedPosts} = useLikedPosts()
  const renderItems = ({item}: {item: IPost}) => (
    <Feed
      postId={item.key}
      userProfilePic={item.userProfile}
      createdAt={item.createdAt}
      username={item.username}
      postTitle={item.title}
      image={item?.image}
      description={item.description}
      likes={dataList.find((post: IPost) => post.key === item.key)?.likes ?? 0}
      userId={item.uid}
      hasUserLikedPost={Boolean(
        userLikedPosts.find((post: IPostLikes) => post.postId === item.key),
      )}
      link={item?.link}
      imageRef={item?.imageRef}
    />
  )
  return (
    <FlatList
      initialNumToRender={3}
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

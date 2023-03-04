import React, {ReactElement, useState} from 'react'
import {FlatList, RefreshControl, StyleSheet} from 'react-native'

import {COLORS} from '@/constants'
import useLikedPosts from '@/hooks/useLikedPosts'
import {FeedPropsCallback, IPost, IPostLikes} from '@/interface'
import Feed from '@/components/Feed'
import {Actionsheet, Spinner, useDisclose} from 'native-base'

const FeedMore = React.lazy(() => import('@/components/BottomSheet/FeedMore'))

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
  const [feedDetails, setFeedDetails] = useState<FeedPropsCallback>({
    postId: '',
    hasImage: false,
    imageRef: '',
    hasLiked: false,
  })
  const {userLikedPosts} = useLikedPosts()
  const {onOpen, onClose, isOpen} = useDisclose()

  const getFeedDetails = (data: FeedPropsCallback) => {
    onOpen()
    setFeedDetails({
      postId: data.postId,
      hasImage: data.hasImage,
      hasLiked: data.hasLiked,
      imageRef: data.imageRef,
    })
  }

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
      cb={getFeedDetails}
    />
  )
  return (
    <>
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
      <Actionsheet disableOverlay isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content style={styles.actionSheetContent}>
          <React.Suspense fallback={<Spinner color="indigo.500" />}>
            <FeedMore
              imageRef={feedDetails.imageRef}
              postId={feedDetails.postId}
              hasImage={feedDetails.hasImage}
              onClose={onClose}
              hasLiked={feedDetails.hasLiked}
            />
          </React.Suspense>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  actionSheetContent: {
    backgroundColor: COLORS.mainBackground,
  },
})

export default React.memo(DataList)

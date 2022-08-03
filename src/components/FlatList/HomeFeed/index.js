import React from 'react'
import useLikedPosts from '../../../hooks/useLikedPosts'

import usePostsQuery from '../../../hooks/usePostsQuery'
import DataList from '../../DataList'
import Footer from '../../DataList/DataListFooter'
import EmptyList from '../../DataList/EmptyDataList'
import HomeHeader from '../../Header/Home'

function HomeFeed({navigation}) {
  const {userLikedPosts} = useLikedPosts()
  const {postStateValue, loading, onRefresh, refreshing, getMoreData} =
    usePostsQuery()

  return (
    <DataList
      dataList={postStateValue.posts}
      EmptyList={<EmptyList loading={loading} />}
      Footer={<Footer dataList={postStateValue.posts} loading={loading} />}
      Header={<HomeHeader navigation={navigation} loading={loading} />}
      onRefresh={onRefresh}
      refreshing={refreshing}
      retrieveMore={getMoreData}
      loading={loading}
      userLikedPosts={userLikedPosts}
      navigation={navigation}
    />
  )
}

export default React.memo(HomeFeed)

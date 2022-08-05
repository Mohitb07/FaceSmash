import React from 'react'
import useLikedPosts from '../../../hooks/useLikedPosts'

import usePostsQuery from '../../../hooks/usePostsQuery'
import DataList from '../../DataList'
import Footer from '../../DataList/DataListFooter'
import EmptyList from '../../DataList/EmptyDataList'
import HomeHeader from '../../Header/Home'

function HomeFeed({navigation}) {
  const {postStateValue, onRefresh, refreshing, getMoreData} = usePostsQuery()

  return (
    <DataList
      dataList={postStateValue.posts}
      EmptyList={<EmptyList loading={postStateValue.loading} />}
      Footer={
        <Footer
          dataList={postStateValue.posts}
          loading={postStateValue.loading}
        />
      }
      Header={
        <HomeHeader navigation={navigation} loading={postStateValue.loading} />
      }
      onRefresh={onRefresh}
      refreshing={refreshing}
      retrieveMore={getMoreData}
      loading={postStateValue.loading}
      navigation={navigation}
    />
  )
}

export default React.memo(HomeFeed)

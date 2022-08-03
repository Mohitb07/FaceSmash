import React, {useEffect, useRef, memo} from 'react'

import useLikedPosts from '../../../hooks/useLikedPosts'
import DataList from '../../DataList'
import Footer from '../../DataList/DataListFooter'
import EmptyList from '../../DataList/EmptyDataList'
import ProfileHeader from '../../Header/Profile'
import useUserPostsQuery from '../../../hooks/useUserPostsQuery'

const ProfileFeed = ({userId, navigation}) => {
  const {userLikedPosts} = useLikedPosts()
  const {myRecentPosts, loading, getMoreData} = useUserPostsQuery(userId)
  const counterRef = useRef(0)

  useEffect(() => {
    counterRef.current = counterRef.current + 1
  })

  console.log('profile feed counter', counterRef.current)

  return (
    <DataList
      dataList={myRecentPosts.posts}
      EmptyList={<EmptyList loading={loading} />}
      Footer={<Footer dataList={myRecentPosts.posts} loading={loading} />}
      Header={
        <ProfileHeader
          totalPosts={myRecentPosts.posts?.length}
          userId={userId}
          navigation={navigation}
        />
      }
      // onRefresh={onRefresh}
      // refreshing={refreshing}
      retrieveMore={getMoreData}
      loading={loading}
      userLikedPosts={userLikedPosts}
      navigation={navigation}
    />
  )
}

export default memo(ProfileFeed)

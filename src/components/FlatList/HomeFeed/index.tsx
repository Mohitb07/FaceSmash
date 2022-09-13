import React, {useCallback, useEffect, useState} from 'react'

import firestore from '@react-native-firebase/firestore'

import {IDefaultPostState} from '../../../atoms/postAtom'
import usePagination from '../../../hooks/usePagination'
import {getLastVisibleDocRef} from '../../../utils/getLastVisibleDocRef'
import DataList from '../../DataList'
import Footer from '../../DataList/DataListFooter'
import EmptyList from '../../DataList/EmptyDataList'
import HomeHeader from '../../Header/Home'
import {IPost} from '../../../interface'

const LIMIT = 5

function HomeFeed() {
  console.log('calling HomeFeed')
  const [postStateValue, setPostStateValue] = useState<IDefaultPostState>({
    loading: true,
    lastVisible: null,
    posts: [],
    selectedPost: null,
  })
  const [refreshing, setRefreshing] = useState(false)
  const {withoutCondition} = usePagination()
  const getPosts = useCallback(() => {
    console.log('calling getPosts home feed')
    try {
      firestore()
        .collection('Posts')
        .orderBy('createdAt', 'desc')
        .limit(LIMIT)
        .onSnapshot(
          snapshot => {
            console.log('calling home feed snapshot')
            const postList: Array<IPost> = snapshot.docs.map(d => ({
              key: d.id,
              createdAt: null,
              description: '',
              likes: 0,
              title: '',
              user: '',
              userProfile: '',
              username: '',
              imageRef: '',
              ...d.data(),
            }))
            const lastVisiblePostRef = getLastVisibleDocRef(snapshot)
            setPostStateValue(prev => ({
              ...prev,
              posts: postList,
              lastVisible: lastVisiblePostRef,
              loading: false,
            }))
          },
          error => {
            console.log('snapshot home post fetching error', error)
          },
        )
    } catch (error) {
      console.log('getPosts error', error)
      setPostStateValue(prev => ({
        ...prev,
        loading: false,
      }))
    } finally {
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    getPosts()
  }, [getPosts])

  const onRefresh = () => {
    try {
      setRefreshing(true)
      getPosts()
    } catch (error) {
      console.log('On Refresh Error:', error)
    }
  }

  const getMoreData = async () => {
    setPostStateValue(prev => ({
      ...prev,
      loading: true,
    }))
    try {
      const {paginatedResult, lastVisibleDocRef} = await withoutCondition(
        postStateValue.lastVisible,
        'Posts',
      )
      setPostStateValue(prev => ({
        ...prev,
        posts: [...postStateValue.posts, ...paginatedResult],
        loading: false,
        lastVisible: lastVisibleDocRef,
      }))
    } catch (error) {
      console.error('ERROR while fetching paginated posts home screen', error)
    } finally {
      setPostStateValue(prev => ({
        ...prev,
        loading: false,
      }))
    }
  }
  const value = <EmptyList loading={postStateValue.loading} />

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
      Header={<HomeHeader />}
      onRefresh={onRefresh}
      refreshing={refreshing}
      retrieveMore={getMoreData}
    />
  )
}

export default React.memo(HomeFeed)

import {useCallback, useEffect, useState} from 'react'

import firestore from '@react-native-firebase/firestore'

import {USERS_COLLECTION} from '@/constants'
import {UserConnectionResult} from '@/Screens/Profile/Followers'

export const useConnections = ({userId}: {userId: string}) => {
  const [connectionsCount, setConnectionCount] = useState({
    followings: 0,
    followers: 0,
  })
  const [followersList, setFollowerList] = useState<UserConnectionResult[]>([])
  const [followingsList, setFollowingsList] = useState<UserConnectionResult[]>(
    [],
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getConnectionCountData = useCallback(
    async (subCollectionName: 'followers' | 'followings') => {
      const data = await firestore()
        .collection(USERS_COLLECTION)
        .doc(userId)
        .collection(subCollectionName)
        .get()
      setLoading(false)
      setConnectionCount(prev => ({
        ...prev,
        [subCollectionName]: data.size,
      }))
      return data
    },
    [userId],
  )

  useEffect(() => {
    try {
      async function getFollowersCount() {
        const followers = await getConnectionCountData('followers')
        const promises = followers.docs.map(item => item.data().user.get())
        Promise.all(promises).then(result => setFollowerList(result))
      }
      async function getFollowingsCount() {
        const followers = await getConnectionCountData('followings')
        const promises = followers.docs.map(item => item.data().user.get())
        Promise.all(promises).then(result => setFollowingsList(result))
      }
      getFollowersCount()
      getFollowingsCount()
    } catch (e) {
      setError(e as string)
    }
  }, [userId, getConnectionCountData])

  return {
    connectionsCount,
    followersList,
    followingsList,
    loading,
    error,
  }
}

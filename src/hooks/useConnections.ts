import {useEffect, useState} from 'react'

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

  useEffect(() => {
    let unsubscribeFollowingData: () => void
    let unsubscribeFollowersData: () => void
    const getData = () => {
      try {
        const followersSubColRef = firestore()
          .collection(USERS_COLLECTION)
          .doc(userId)
          .collection('followers')

        unsubscribeFollowersData = followersSubColRef.onSnapshot(
          async snap => {
            const promises = snap.docs.map(d => d.data().user.get())
            const result = await Promise.all(promises)
            const list = result.map(d => d.data())
            setFollowerList(list)
            setConnectionCount(prev => ({
              ...prev,
              followers: snap.size,
            }))
          },
          err => {
            console.log('error while fetching followers', err)
          },
        )

        const followingSubColRef = firestore()
          .collection(USERS_COLLECTION)
          .doc(userId)
          .collection('followings')

        unsubscribeFollowingData = followingSubColRef.onSnapshot(
          async snap => {
            const promises = snap.docs.map(d => d.data().user.get())
            const result = await Promise.all(promises)
            const list = result.map(d => d.data())
            setFollowingsList(list)
            setConnectionCount(prev => ({
              ...prev,
              followings: snap.size,
            }))
            setLoading(false)
          },
          err => {
            console.log('error while fetching followings', err)
          },
        )
      } catch (e) {
        setError(e as string)
      }
    }
    getData()
    return () => {
      unsubscribeFollowingData()
      unsubscribeFollowersData()
    }
  }, [userId])

  return {
    connectionsCount,
    followersList,
    followingsList,
    loading,
    error,
  }
}
